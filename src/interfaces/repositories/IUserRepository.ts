import { User } from '@prisma/client'
import { CreateUserDTO } from '../../dtos/create/CreateUserDTO'
import { UpdateUserDTO } from '../../dtos/update/UpdateUserDTO'

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  createUser(dto: CreateUserDTO & { password: string }): Promise<User>
  updateUser(
    id: string,
    dto: UpdateUserDTO & { password?: string }
  ): Promise<User | null>
  deleteUser(id: string): Promise<User | null>
  findAll(): Promise<User[]>
}
