type User = {
  id: number
  createdAt: datetime
  updatedAt: datetime
  email: string
  password: string
  firstname: string
  lastname: string
  role: string
}

export type UserSession = Omit<User, 'password' | 'refreshToken'>
