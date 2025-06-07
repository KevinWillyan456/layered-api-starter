import { User } from '@prisma/client'
import { UserDAO } from '../daos/UserDAO'

// Repository: abstrai o DAO 🧩
export class UserRepository {
  private dao: UserDAO

  constructor(dao: UserDAO) {
    this.dao = dao
  }
  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    // Chama o DAO para criar usuário 🛠️
    return this.dao.createUser({ name, email, password })
  }

  async findByEmail(email: string): Promise<User | null> {
    // Chama o DAO para buscar usuário 🔗
    return this.dao.findByEmail(email)
  }

  async findById(id: string): Promise<User | null> {
    return this.dao.findById(id)
  }

  async updateUser(
    id: string,
    data: { name?: string; email?: string; password?: string }
  ): Promise<User | null> {
    return this.dao.updateUser(id, data)
  }

  async deleteUser(id: string): Promise<User | null> {
    return this.dao.deleteUser(id)
  }

  async findAll(): Promise<User[]> {
    return this.dao.findAll()
  }
}
