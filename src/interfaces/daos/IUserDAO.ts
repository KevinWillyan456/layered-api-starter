import { User } from '@prisma/client'
import { CreateUserDTO } from '../../dtos/create/CreateUserDTO'
import { UpdateUserDTO } from '../../dtos/update/UpdateUserDTO'

export interface IUserDAO {
  createUser(data: CreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  updateUser(id: string, data: UpdateUserDTO): Promise<User | null>
  deleteUser(id: string): Promise<User | null>
  findAll(): Promise<User[]>
}
