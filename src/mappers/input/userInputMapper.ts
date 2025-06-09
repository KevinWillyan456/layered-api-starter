// Funções para tratar dados de entrada do usuário

import { CreateUserDTO } from '../../dtos/create/CreateUserDTO'
import { LoginUserDTO } from '../../dtos/login/LoginUserDTO'
import { UpdateUserDTO } from '../../dtos/update/UpdateUserDTO'
import { HttpStatus } from '../../enums/httpStatus'
import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema
} from '../../schemas/userSchemas'
import { HttpError } from '../../utils/HttpError'

// Normaliza e valida dados para criação de usuário
export function toCreateUserDTO(input: CreateUserDTO): CreateUserDTO {
  // Verifica se o input é um objeto
  if (typeof input !== 'object' || input === null) {
    throw new HttpError(
      'Entrada inválida: esperado um objeto',
      HttpStatus.BAD_REQUEST
    )
  }

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
  // Verifica se o input é um objeto
  if (typeof input !== 'object' || input === null) {
    throw new HttpError(
      'Entrada inválida: esperado um objeto',
      HttpStatus.BAD_REQUEST
    )
  }

  // Mapeia e normaliza os dados de entrada
  const mapped: UpdateUserDTO = {}

  if (input.name !== undefined)
    mapped.name =
      typeof input.name === 'string'
        ? input.name.trim().replace(/\s+/g, ' ')
        : input.name
  if (input.email !== undefined)
    mapped.email =
      typeof input.email === 'string'
        ? input.email.trim().toLowerCase()
        : input.email
  if (input.password !== undefined) mapped.password = input.password

  // Valida os dados de entrada
  updateUserSchema.parse(mapped)

  // Retorna o DTO normalizado e validado
  return mapped
}

// Nomaliza e valida dados para login de usuário
export function toLoginUserDTO(input: LoginUserDTO): LoginUserDTO {
  // Verifica se o input é um objeto
  if (typeof input !== 'object' || input === null) {
    throw new HttpError(
      'Entrada inválida: esperado um objeto',
      HttpStatus.BAD_REQUEST
    )
  }

  // Mapeia e normaliza os dados de entrada
  const mapped = {
    email:
      typeof input.email === 'string'
        ? input.email.trim().toLowerCase()
        : input.email,
    password: input.password // Senha não deve ser alterada aqui
  }

  // Valida os dados de entrada
  loginUserSchema.parse(mapped)

  // Retorna o DTO normalizado e validado
  return mapped
}
