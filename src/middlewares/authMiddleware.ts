import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { HttpStatus } from '../enums/httpStatus'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Token não fornecido.' })
    return
  }

  const [, token] = authHeader.split(' ')
  if (!token) {
    res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Token mal formatado.' })
    return
  }

  try {
    jwt.verify(token, JWT_SECRET)

    // Você pode adicionar o usuário decodificado ao request se quiser
    // const decoded = jwt.verify(token, JWT_SECRET)
    // ;(req as unknown as { user: unknown }).user = decoded

    next()
  } catch {
    res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Token inválido.' })
    return
  }
}
