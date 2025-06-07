import { z } from 'zod'
import { loginUserSchema } from '../../schemas/userSchemas'

// DTO para login de usuário 🔑
export type LoginUserDTO = z.infer<typeof loginUserSchema>
