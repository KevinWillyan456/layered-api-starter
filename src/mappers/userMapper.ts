import { User } from '@prisma/client'
import { UserResponseDTO } from '../dtos/UserResponseDTO'

// Função para mapear User (entidade) para UserResponseDTO
export function toUserResponseDTO(user: User): UserResponseDTO {
  return {
    id: user.id,
    name: user.name,
    email: user.email
  }
}
