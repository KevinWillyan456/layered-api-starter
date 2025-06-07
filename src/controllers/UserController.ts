import { Request, Response } from 'express'
import { UserDAO } from '../daos/UserDAO'
import { HttpStatus } from '../enums/httpStatus'
import { UserRepository } from '../repositories/UserRepository'
import { UserService } from '../services/UserService'

const userDAO = new UserDAO()
const userRepository = new UserRepository(userDAO)
const userService = new UserService(userRepository)

export class UserController {
  // Função auxiliar para tratar erros ⚠️
  private static handleError(res: Response, err: any) {
    // Validação específica para erros do Zod 🔍
    if (err.name === 'ZodError' && err.errors) {
      const errors = err.errors.map((e: any) => ({
        path: e.path.join('.'),
        message: e.messagewww
      }))
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Erro de validação', details: errors })
    }
    const statusCode = err.statusCode || HttpStatus.BAD_REQUEST
    const message = err.message || 'Erro inesperado'
    res.status(statusCode).json({ error: message })
  }

  static async createUser(req: Request, res: Response) {
    try {
      // Recebe dados do body 📦
      const { name, email, password } = req.body
      const user = await userService.createUser({ name, email, password })
      res.status(HttpStatus.CREATED).json(user) // Retorna usuário criado 🎉
    } catch (err: any) {
      UserController.handleError(res, err)
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    const id = req.params.id
    const user = await userService.getUserById(id)
    if (!user) {
      res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'Usuário não encontrado!' })
      return
    }
    res.json(user)
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    const id = req.params.id
    try {
      const { name, email, password } = req.body
      const user = await userService.updateUser(id, { name, email, password })
      if (!user) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ error: 'Usuário não encontrado!' })
        return
      }
      res.json(user)
    } catch (err: any) {
      UserController.handleError(res, err)
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    const id = req.params.id
    const deleted = await userService.deleteUser(id)
    if (!deleted) {
      res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'Usuário não encontrado!' })
      return
    }
    res.status(HttpStatus.NO_CONTENT).send()
  }

  static async listUsers(req: Request, res: Response): Promise<void> {
    const users = await userService.listUsers()
    res.json(users)
  }
}
