import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { CreateUserDTO } from '../dtos/CreateUserDTO'
import { UpdateUserDTO } from '../dtos/UpdateUserDTO'
import { UserResponseDTO } from '../dtos/UserResponseDTO'
import { UserRepository } from '../repositories/UserRepository'

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
})

const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional()
})

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

// Service: lógica de negócio 🧠
export class UserService {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async createUser(
    dto: CreateUserDTO
  ): Promise<UserResponseDTO & { token: string }> {
    createUserSchema.parse(dto)
    // Verifica se o e-mail já existe 🚫
    const exists = await this.userRepository.findByEmail(dto.email)
    if (exists) throw new Error('E-mail já cadastrado!')

    // Cria usuário ✅
    const hashedPassword = await bcrypt.hash(dto.password, 10)
    const user = await this.userRepository.createUser(
      dto.name,
      dto.email,
      hashedPassword
    )
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h'
    })
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: `Bearer ${token}`
    }
  }

  async getUserById(id: string): Promise<UserResponseDTO | null> {
    // Busca usuário por ID 🔍
    const user = await this.userRepository.findById(id)
    if (!user) return null
    return { id: user.id, name: user.name, email: user.email }
  }

  async updateUser(
    id: string,
    dto: UpdateUserDTO
  ): Promise<UserResponseDTO | null> {
    updateUserSchema.parse(dto)
    // Verifica se o e-mail já existe e não pertence ao próprio usuário 🚫
    if (dto.email) {
      const exists = await this.userRepository.findByEmail(dto.email)
      if (exists && exists.id !== id) throw new Error('E-mail já cadastrado!')
    }
    let data = { ...dto }
    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 10)
    }
    // Atualiza usuário
    const user = await this.userRepository.updateUser(id, data)
    if (!user) return null
    return { id: user.id, name: user.name, email: user.email }
  }

  async deleteUser(id: string): Promise<boolean> {
    // Deleta usuário
    const user = await this.userRepository.deleteUser(id)
    return !!user
  }

  async listUsers(): Promise<UserResponseDTO[]> {
    // Lista todos os usuários
    const users = await this.userRepository.findAll()
    return users.map((u) => ({ id: u.id, name: u.name, email: u.email }))
  }
}
