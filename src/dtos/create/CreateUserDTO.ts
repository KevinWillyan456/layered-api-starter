import { z } from 'zod'
import { createUserSchema } from '../../schemas/userSchemas'

// DTO para criar usuário 🚀
export type CreateUserDTO = z.infer<typeof createUserSchema>
