import { UserSession } from '../../lib/auth'
import { ApiResponse } from '../../lib/types/api'

export type LoginApiResponse = ApiResponse<{
  accessToken: string
  refreshToken: string
  user: UserSession
  error: string
  message: string
}>

export type RefreshApiResponse = ApiResponse<{
  access_token: string
  message: string
}>
