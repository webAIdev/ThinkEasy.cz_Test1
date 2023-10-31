import { UserSession } from '../../lib/auth'
import { ApiResponse } from '../../lib/types/api'

export type RegisterApiResponse = ApiResponse<{
  accessToken: string
  refreshToken: string
}>