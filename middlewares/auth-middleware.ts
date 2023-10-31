import { NextApiRequest, NextApiResponse } from 'next'
import { ApiResponse } from '../lib/types/api'
import { UserSession } from '../lib/types/auth'
import { Middleware } from '../lib/types/middleware'

export type NextApiRequestWithUser = NextApiRequest & {
  user: UserSession
}

// middleware.ts
export const authMiddleware: Middleware = async <T extends ApiResponse<T>>(
  req: NextApiRequestWithUser,
  res: NextApiResponse<T>,
  next?: Middleware
) => {
  // look for access token inside cookies
  const token =
    req.cookies && req.cookies.token ? req.cookies.token.split(' ')[0] : null
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Missing token',
    } as T)
  }

  if (next) await next(req, res, undefined)

  // Else, return
  return res.status(200)
}