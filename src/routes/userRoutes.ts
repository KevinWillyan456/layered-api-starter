import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { authMiddleware } from '../middlewares/authMiddleware'

export const router = Router()

// Rota para criar usuário 🆕 (pública)
router.post('/users', UserController.createUser)

// Rotas protegidas 🔒
router.get('/users', authMiddleware, UserController.listUsers)
router.get('/users/:id', authMiddleware, UserController.getUserById)
router.put('/users/:id', authMiddleware, UserController.updateUser)
router.delete('/users/:id', authMiddleware, UserController.deleteUser)
