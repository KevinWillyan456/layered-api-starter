// Funções para tratar dados de entrada do usuário

import { CreateUserDTO } from '../../dtos/create/CreateUserDTO'
import { UpdateUserDTO } from '../../dtos/update/UpdateUserDTO'

// Normaliza e valida dados para criação de usuário
export function toCreateUserDTO(input: CreateUserDTO): CreateUserDTO {
  return {
    name: input.name.trim().replace(/\s+/g, ' '),
    email: input.email.trim().toLowerCase(),
    password: input.password // Não alterar senha aqui
  }
}

// Normaliza e valida dados para atualização de usuário
export function toUpdateUserDTO(input: UpdateUserDTO): UpdateUserDTO {
  const mapped: UpdateUserDTO = {}
  if (input.name !== undefined)
    mapped.name = input.name.trim().replace(/\s+/g, ' ')
  if (input.email !== undefined) mapped.email = input.email.trim().toLowerCase()
  if (input.password !== undefined) mapped.password = input.password
  return mapped
}
