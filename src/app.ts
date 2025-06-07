import cors from 'cors'
import 'dotenv/config'
import express, { Request, Response } from 'express'
import path from 'path'
import { HttpStatus } from './enums/httpStatus'
import { router } from './routes/userRoutes'

const app = express()

app.use(cors()) // Habilita CORS 🌐
app.use(express.json()) // Middleware para JSON 🧩
app.use(router) // Usa rotas de usuário 🚦

// Configura o mecanismo de views EJS
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Rota principal renderizando a view
app.get('/', (req: Request, res: Response) => {
  res.render('index')
})

// Middleware para rotas não existentes
app.use((req: Request, res: Response) => {
  res.status(HttpStatus.NOT_FOUND).json({ error: 'Rota não encontrada.' })
})

export default app
