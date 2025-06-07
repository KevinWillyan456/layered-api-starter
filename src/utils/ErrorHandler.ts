import { Response } from 'express'
import { HttpStatus } from '../enums/httpStatus'
import { HttpError } from './HttpError'

// src/utils/ErrorHandler.ts
export class HandleError {
  // Função auxiliar para tratar erros ⚠️
  public static handleError(res: Response, err: HttpError | unknown) {
    // Validação específica para erros do Zod 🔍
    if (err instanceof Error && err.name === 'ZodError' && 'errors' in err) {
      const zodErr = err as Error & {
        errors: Array<{ path: string[]; message: string }>
      }
      const errors = zodErr.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message
      }))
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Erro de validação', details: errors })
    } else if (err instanceof HttpError) {
      // Erro personalizado com status code e mensagem
      console.error('Erro:', err)
      const statusCode = err.statusCode || HttpStatus.BAD_REQUEST
      const message = err.message || 'Erro inesperado'
      res.status(statusCode).json({ error: message })
    } else {
      // Erro genérico
      console.error('Erro inesperado:', err)
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: 'Erro interno do servidor' })
    }
  }
}
