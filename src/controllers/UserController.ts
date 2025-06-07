import { Request, Response } from 'express'
import { UserDAO } from '../daos/UserDAO'
import { HttpStatus } from '../enums/httpStatus'
import { UserRepository } from '../repositories/UserRepository'
import { UserService } from '../services/UserService'
import { HandleError } from '../utils/ErrorHandler'

const userDAO = new UserDAO()
const userRepository = new UserRepository(userDAO)
const userService = new UserService(userRepository)

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      // Recebe dados do body 📦
      const { name, email, password } = req.body
      const user = await userService.createUser({ name, email, password })
      res.status(HttpStatus.CREATED).json(user) // Retorna usuário criado 🎉
    } catch (err: unknown) {
      HandleError.handleError(res, err)
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
      HandleError.handleError(res, err)
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    const id = req.params.id
    try {
      const { name, email, password } = req.body
      const user = await userService.updateUser(id, { name, email, password })
      res.json(user)
    } catch (err: unknown) {
      HandleError.handleError(res, err)
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
      HandleError.handleError(res, err)
    }
  }

  static async listUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.listUsers()
      res.json(users)
    } catch (err: unknown) {
      HandleError.handleError(res, err)
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const result = await userService.login({ email, password })
      res.json(result)
    } catch (err: unknown) {
      HandleError.handleError(res, err)
    }
  }
}
