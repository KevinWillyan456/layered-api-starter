import { User } from '@prisma/client'
import { CreateUserDTO } from '../dtos/create/CreateUserDTO'
import { UpdateUserDTO } from '../dtos/update/UpdateUserDTO'
import { IUserDAO } from '../interfaces/daos/IUserDAO'
import { IUserRepository } from '../interfaces/repositories/IUserRepository'

// Repository: abstrai o DAO 🧩
export class UserRepository implements IUserRepository {
  private dao: IUserDAO

  constructor(dao: IUserDAO) {
    this.dao = dao // Injeta o DAO de usuários
  }

  async createUser(data: CreateUserDTO): Promise<User> {
    // Chama o DAO para criar usuário 🛠️
    return this.dao.createUser(data)
  }

  async findByEmail(email: string): Promise<User | null> {
    // Chama o DAO para buscar usuário 🔗
    return this.dao.findByEmail(email)
  }

  async findById(id: string): Promise<User | null> {
    return this.dao.findById(id)
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<User | null> {
    return this.dao.updateUser(id, data)
  }

  async deleteUser(id: string): Promise<User | null> {
    return this.dao.deleteUser(id)
  }

  async findAll(): Promise<User[]> {
    return this.dao.findAll()
  }
}
