import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    res.status(401).json({ error: 'Token não fornecido.' })
    return
  }

  const [, token] = authHeader.split(' ')
  if (!token) {
    res.status(401).json({ error: 'Token mal formatado.' })
    return
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    // Você pode adicionar o usuário decodificado ao request se quiser
    ;(req as any).user = decoded

    console.log('Token decodificado:', decoded) // Para depuração
    next()
  } catch (err) {
    res.status(401).json({ error: 'Token inválido.' })
    return
  }
}
