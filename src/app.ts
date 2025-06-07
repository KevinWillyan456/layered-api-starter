import cors from 'cors'
import 'dotenv/config'
import express, { Request, Response } from 'express'
import { HttpStatus } from './enums/httpStatus'
import { router } from './routes/userRoutes'

const app = express()

app.use(cors()) // Habilita CORS 🌐
app.use(express.json()) // Middleware para JSON 🧩
app.use(router) // Usa rotas de usuário 🚦

app.get('/', (req: Request, res: Response) => {
  res.send('API Node.js + Prisma + MVC 🚀')
})

// Middleware para rotas não existentes
app.use((req: Request, res: Response) => {
  res.status(HttpStatus.NOT_FOUND).json({ error: 'Rota não encontrada.' })
})

export default app
