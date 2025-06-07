import cors from 'cors'
import 'dotenv/config'
import express, { Request, Response } from 'express'
import { router } from './routes/userRoutes'

const app = express()

app.use(cors()) // Habilita CORS 🌐
app.use(express.json()) // Middleware para JSON 🧩
app.use(router) // Usa rotas de usuário 🚦

app.get('/', (req: Request, res: Response) => {
  res.send('API Node.js + Prisma + MVC 🚀')
})

export default app
