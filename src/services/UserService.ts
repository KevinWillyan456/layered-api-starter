import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { bcryptConfig } from '../configs/bcryptConfig'
import { CreateUserDTO } from '../dtos/create/CreateUserDTO'
import { UserResponseDTO } from '../dtos/response/UserResponseDTO'
import { UpdateUserDTO } from '../dtos/update/UpdateUserDTO'
import { HttpStatus } from '../enums/httpStatus'
import { IUserRepository } from '../interfaces/repositories/IUserRepository'
import {
  toUserResponseDTO,
  toUsersResponseDTO
} from '../mappers/output/userOutputMapper'
import { HttpError } from '../utils/HttpError'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

// Service: lógica de negócio 🧠
export class UserService {
  private userRepository: IUserRepository

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository // Injeta o repositório de usuários
  }

  async createUser(
    dto: CreateUserDTO
  ): Promise<UserResponseDTO & { token: string }> {
    // Verifica se o e-mail já existe 🚫
    const exists = await this.userRepository.findByEmail(dto.email)
    if (exists) {
      throw new HttpError('E-mail já cadastrado!', HttpStatus.CONFLICT)
    }

    // Cria usuário ✅
    const hashedPassword = await bcrypt.hash(
      dto.password,
      bcryptConfig.SALT_ROUNDS
    )
    const user = await this.userRepository.createUser({
      ...dto,
      password: hashedPassword
    })
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h'
    })
    return {
      ...toUserResponseDTO(user),
      token: `Bearer ${token}`
    }
  }

  async getUserById(id: string): Promise<UserResponseDTO | null> {
    if (!id) {
      throw new HttpError(
        'ID do usuário é obrigatório!',
        HttpStatus.BAD_REQUEST
      )
    }

    // Verifica se o Usário existe antes de buscar 🔍
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new HttpError('Usuário não encontrado!', HttpStatus.NOT_FOUND)
    }
    return toUserResponseDTO(user)
  }

  async updateUser(
    id: string,
    dto: UpdateUserDTO
  ): Promise<UserResponseDTO | null> {
    if (!id) {
      throw new HttpError(
        'ID do usuário é obrigatório!',
        HttpStatus.BAD_REQUEST
      )
    }
    // Verifica se o usário existe
    const exists = await this.userRepository.findById(id)
    if (!exists) {
      throw new HttpError('Usuário não encontrado!', HttpStatus.NOT_FOUND)
    }

    // Verifica se o e-mail já existe e não pertence ao próprio usuário 🚫
    if (dto.email) {
      const exists = await this.userRepository.findByEmail(dto.email)
      if (exists && exists.id !== id) {
        throw new HttpError('E-mail já cadastrado!', HttpStatus.CONFLICT)
      }
    }
    const data = { ...dto }
    // Se a senha foi informada, faz o hash antes de atualizar 🔒
    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, bcryptConfig.SALT_ROUNDS)
    }
    // Atualiza usuário
    const user = await this.userRepository.updateUser(id, data)
    if (!user) {
      throw new HttpError('Usuário não encontrado!', HttpStatus.NOT_FOUND)
    }
    return toUserResponseDTO(user)
  }

  async deleteUser(id: string): Promise<boolean> {
    if (!id) {
      throw new HttpError(
        'ID do usuário é obrigatório!',
        HttpStatus.BAD_REQUEST
      )
    }

    // Verifica se o usuário existe antes de deletar
    const exists = await this.userRepository.findById(id)
    if (!exists) {
      throw new HttpError('Usuário não encontrado!', HttpStatus.NOT_FOUND)
    }

    // Deleta usuário
    const user = await this.userRepository.deleteUser(id)
    if (!user) {
      throw new HttpError(
        'Não foi possível deletar o usuário!',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
    return !!user
  }

  async listUsers(): Promise<UserResponseDTO[]> {
    // Lista todos os usuários
    const users = await this.userRepository.findAll()
    return toUsersResponseDTO(users)
  }

  async login(dto: {
    email: string
    password: string
  }): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(dto.email)
    if (!user) {
      throw new HttpError('E-mail ou senha inválidos!')
    }
    const valid = await bcrypt.compare(dto.password, user.password)
    if (!valid) {
      throw new HttpError('E-mail ou senha inválidos!', HttpStatus.UNAUTHORIZED)
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h'
    })
    return { token: `Bearer ${token}` }
  }
}
