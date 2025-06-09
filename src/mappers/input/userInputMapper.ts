// Funções para tratar dados de entrada do usuário

import { CreateUserDTO } from '../../dtos/create/CreateUserDTO'
import { LoginUserDTO } from '../../dtos/login/LoginUserDTO'
import { UpdateUserDTO } from '../../dtos/update/UpdateUserDTO'
import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema
} from '../../schemas/userSchemas'

// Normaliza e valida dados para criação de usuário
export function toCreateUserDTO(input: CreateUserDTO): CreateUserDTO {
  // Mapeia e normaliza os dados de entrada
  const mapped: CreateUserDTO = {
    name:
      typeof input.name === 'string'
        ? input.name.trim().replace(/\s+/g, ' ')
        : input.name,
    email:
      typeof input.email === 'string'
        ? input.email.trim().toLowerCase()
        : input.email,
    password: input.password // Senha não deve ser alterada aqui
  }

  // Valida os dados de entrada
  createUserSchema.parse(mapped)

  // Retorna o DTO normalizado e validado
  return mapped
}

// Normaliza e valida dados para atualização de usuário
export function toUpdateUserDTO(input: UpdateUserDTO): UpdateUserDTO {
  // Mapeia e normaliza os dados de entrada
  const mapped: UpdateUserDTO = {}

  if (input.name !== undefined)
    mapped.name = input.name.trim().replace(/\s+/g, ' ')
  if (input.email !== undefined) mapped.email = input.email.trim().toLowerCase()
  if (input.password !== undefined) mapped.password = input.password

  // Valida os dados de entrada
  updateUserSchema.parse(mapped)

  // Retorna o DTO normalizado e validado
  return mapped
}

// Nomaliza e valida dados para login de usuário
export function toLoginUserDTO(input: LoginUserDTO): LoginUserDTO {
  // Mapeia e normaliza os dados de entrada
  const mapped = {
    email: input.email.trim().toLowerCase(),
    password: input.password // Senha não deve ser alterada aqui
  }

  // Valida os dados de entrada
  loginUserSchema.parse(mapped)

  // Retorna o DTO normalizado e validado
  return mapped
}
