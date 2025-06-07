import { Request, Response } from 'express'
import { UserDAO } from '../daos/UserDAO'
import { HttpStatus } from '../enums/httpStatus'
import {
  toCreateUserDTO,
  toLoginUserDTO,
  toUpdateUserDTO
} from '../mappers/input/userInputMapper'
import { UserRepository } from '../repositories/UserRepository'
import { UserService } from '../services/UserService'
import { HandleError } from '../utils/ErrorHandler'

const userDAO = new UserDAO()
const userRepository = new UserRepository(userDAO)
const userService = new UserService(userRepository)

export class UserController {
  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userInput = toCreateUserDTO(req.body)
      const user = await userService.createUser(userInput)
      res.status(HttpStatus.CREATED).json(user) // Retorna usuário criado 🎉
    } catch (err: unknown) {
      HandleError.handleError(res, err)
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    const id = req.params.id
    try {
      const user = await userService.getUserById(id)
      res.status(HttpStatus.OK).json(user) // Retorna usuário encontrado ✅
    } catch (err: unknown) {
      HandleError.handleError(res, err)
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    const id = req.params.id
    try {
      const userInput = toUpdateUserDTO(req.body)
      const user = await userService.updateUser(id, userInput)
      res.status(HttpStatus.OK).json(user) // Retorna usuário atualizado ✅
    } catch (err: unknown) {
      HandleError.handleError(res, err)
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    const id = req.params.id
    try {
      await userService.deleteUser(id)
      res.status(HttpStatus.NO_CONTENT).send() // Retorna 204 No Content após exclusão 🗑️
    } catch (err: unknown) {
      HandleError.handleError(res, err)
    }
  }

  static async listUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.listUsers()
      res.status(HttpStatus.OK).json(users) // Retorna lista de usuários 📋
    } catch (err: unknown) {
      HandleError.handleError(res, err)
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const userInput = toLoginUserDTO(req.body)
      const result = await userService.login(userInput)
      res.status(HttpStatus.OK).json(result) // Retorna token de autenticação 🔑
    } catch (err: unknown) {
      HandleError.handleError(res, err)
    }
  }
}
