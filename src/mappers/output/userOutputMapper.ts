import { User } from '@prisma/client'
import { UserResponseDTO } from '../../dtos/response/UserResponseDTO'

// Função para mapear User (entidade) para UserResponseDTO
export function toUserResponseDTO(user: User): UserResponseDTO {
  return {
    id: user.id,
    name: user.name,
    email: user.email
    // Adicione outros campos públicos se necessário
  }
}

// Para listas de usuários
export function toUsersResponseDTO(users: User[]): UserResponseDTO[] {
  return users.map(toUserResponseDTO)
}
