import { Request, Response } from 'express'
import { UserDAO } from '../daos/UserDAO'
import { HttpStatus } from '../enums/httpStatus'
import { UserRepository } from '../repositories/UserRepository'
import { UserService } from '../services/UserService'
import { HttpError } from '../utils/HttpError'

const userDAO = new UserDAO()
const userRepository = new UserRepository(userDAO)
const userService = new UserService(userRepository)

export class UserController {
  // Função auxiliar para tratar erros ⚠️
  private static handleError(res: Response, err: HttpError | unknown) {
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

  static async createUser(req: Request, res: Response) {
    try {
      // Recebe dados do body 📦
      const { name, email, password } = req.body
      const user = await userService.createUser({ name, email, password })
      res.status(HttpStatus.CREATED).json(user) // Retorna usuário criado 🎉
    } catch (err: unknown) {
      UserController.handleError(res, err)
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    const id = req.params.id
    try {
      const user = await userService.getUserById(id)
      if (!user) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ error: 'Usuário não encontrado!' })
        return
      }
      res.json(user)
    } catch (err: unknown) {
      UserController.handleError(res, err)
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    const id = req.params.id
    try {
      const { name, email, password } = req.body
      const user = await userService.updateUser(id, { name, email, password })
      res.json(user)
    } catch (err: unknown) {
      UserController.handleError(res, err)
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    const id = req.params.id
    try {
      const deleted = await userService.deleteUser(id)
      if (!deleted) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ error: 'Usuário não encontrado!' })
        return
      }
      res.status(HttpStatus.NO_CONTENT).send()
    } catch (err: unknown) {
      UserController.handleError(res, err)
    }
  }

  static async listUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.listUsers()
      res.json(users)
    } catch (err: unknown) {
      UserController.handleError(res, err)
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const result = await userService.login({ email, password })
      res.json(result)
    } catch (err: unknown) {
      UserController.handleError(res, err)
    }
  }
}
