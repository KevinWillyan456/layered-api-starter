import { z } from 'zod'
import { updateUserSchema } from '../../schemas/userSchemas'

// DTO para atualizar usuário ✏️
export type UpdateUserDTO = z.infer<typeof updateUserSchema>
