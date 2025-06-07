import { PrismaClient, User } from '@prisma/client'
import { CreateUserDTO } from '../dtos/create/CreateUserDTO'
import { UpdateUserDTO } from '../dtos/update/UpdateUserDTO'

const prisma = new PrismaClient()

// DAO: acesso direto ao banco de dados 🗄️
export class UserDAO {
  async createUser(data: CreateUserDTO): Promise<User> {
    // Cria usuário no banco 🆕
    return prisma.user.create({ data })
  }

  async findByEmail(email: string): Promise<User | null> {
    // Busca usuário por e-mail 🔍
    return prisma.user.findUnique({ where: { email } })
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } })
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<User | null> {
    return prisma.user.update({ where: { id }, data })
  }

  async deleteUser(id: string): Promise<User | null> {
    return prisma.user.delete({ where: { id } })
  }

  async findAll(): Promise<User[]> {
    return prisma.user.findMany()
  }
}
