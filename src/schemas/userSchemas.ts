import { z } from 'zod'

const NAME_MIN_LENGTH = 3
const PASSWORD_LENGTH = 6

export const createUserSchema = z.object({
  name: z.string().min(NAME_MIN_LENGTH, {
    message: `Nome deve ter pelo menos ${NAME_MIN_LENGTH} caracteres`
  }),
  email: z.string().email({
    message: 'Email inválido'
  }),
  password: z.string().min(PASSWORD_LENGTH, {
    message: `Senha deve ter pelo menos ${PASSWORD_LENGTH} caracteres`
  })
})

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(NAME_MIN_LENGTH, {
      message: `Nome deve ter pelo menos ${NAME_MIN_LENGTH} caracteres`
    })
    .optional(),
  email: z
    .string()
    .email({
      message: 'Email inválido'
    })
    .optional(),
  password: z
    .string()
    .min(PASSWORD_LENGTH, {
      message: `Senha deve ter pelo menos ${PASSWORD_LENGTH} caracteres`
    })
    .optional()
})

export const loginUserSchema = z.object({
  email: z.string().email({
    message: 'Email inválido'
  }),
  password: z.string().min(PASSWORD_LENGTH, {
    message: `Senha deve ter pelo menos ${PASSWORD_LENGTH} caracteres`
  })
})
