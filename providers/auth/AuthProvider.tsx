import { createContext, useContext, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';

import { UserSession } from '../../lib/types/auth'
import { LoginApiResponse, RefreshApiResponse } from '../../pages/login/login'
import { RegisterApiResponse } from '../../pages/register/register'
import { userState } from '../../store/store';

interface AuthContextData {
  isAuthenticated: boolean
  accessToken: string | null
  refreshToken: string | null
  logIn: (_data: LoginData) => Promise<void>
  signUp: (_data: RegisterData) => Promise<void>
  logOut: () => void
  refreshSession: () => Promise<void>
}

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextData>({
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  logIn: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  logOut: () => { },
  refreshSession: () => Promise.resolve(),
})

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [, setUserInfo] = useRecoilState(userState);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshToken, setRefreshToken] = useState<string | null>(null)

  // Watch access token
  useEffect(() => {
    console.log('access token changed')
    if (!accessToken) {
      // Read access token from cookies
      const cookies = document.cookie.split(';')
      const tokenCookie = cookies.find(cookie => cookie.includes('token'))
      if (tokenCookie) {
        const token = tokenCookie.split('=')[1]
        setAccessToken(token)
      }
    }
  }, [accessToken])

  // Watch refresh token
  useEffect(() => {
    console.log('refresh token changed')
    if (!refreshToken) {
      // try to get refresh token from local storage
      const token = localStorage.getItem('refreshToken')
      console.log('refresh token', token)
      if (token != null && token !== 'undefined') {
        setRefreshToken(token)
      }
    }
  }, [refreshToken])

  const signUp = async (data: RegisterData) => {
    return new Promise<void>((resolve, reject) => {
      // Send data to API
      fetch('https://frontend-test-be.stage.thinkeasy.cz/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(res => res.json() as Promise<RegisterApiResponse>)
        .then(res => {
          if (res.error) {
            reject(new Error(res.message))
            return;
          }

          document.cookie = `token=${res.accessToken} secure`

          // Save refresh token in session storage for persistence
          localStorage.setItem('refreshToken', res.refreshToken)

          // Save access token and refresh token
          setRefreshToken(res.refreshToken)

          resolve();
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  const logIn = async (data: LoginData) => {
    return new Promise<void>((resolve, reject) => {
      // Send data to API
      fetch('https://frontend-test-be.stage.thinkeasy.cz/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(res => res.json() as Promise<LoginApiResponse>)
        .then(res => {
          if (res.error) {
            reject(new Error(res.message))
            return;
          }
          // save access token in cookies
          document.cookie = `token=${res.accessToken} secure`

          // Save refresh token in session storage for persistence
          localStorage.setItem('refreshToken', res.refreshToken)

          // Save access token and refresh token
          setAccessToken(res.accessToken)
          setRefreshToken(res.refreshToken)

          // save user data inside state
          setUserInfo(res.user);

          // save current user in local storage
          localStorage.setItem(
            'currentUser',
            JSON.stringify(res.user)
          )

          // set isAuthenticated to true
          setIsAuthenticated(true)

          // set auth state
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  const logOut = () => {
    // Remove access token from cookies
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

    // Clear provider state
    setUserInfo(null)
    setIsAuthenticated(false)
    setAccessToken('')
    setRefreshToken('')

    // Remove persistence data from local storage
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('currentUser')
  }

  const refreshSession = async () => {
    // Read refresh token from localStorage if not found in provider state
    if (!refreshToken) {
      const token = localStorage.getItem('refreshToken')
      if (token != null && token !== 'undefined') {
        setRefreshToken(token)
      } else {
        return Promise.reject(new Error('Refresh token not found'))
      }
    }

    // Send API request to refresh endpoint
    return new Promise<void>((resolve, reject) => {
      fetch('https://frontend-test-be.stage.thinkeasy.cz/auth/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ token: refreshToken }),
      })
        .then(res => res.json() as Promise<RefreshApiResponse>)
        .then(res => {
          if (res.message) {
            reject(new Error(res.message))
            return;
          }
          // Overwrite current token with new one
          document.cookie = `token=${res.access_token} secure`

          // Refresh access token
          setAccessToken(res.access_token)

          // Refreshed correctly
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        logIn,
        signUp,
        logOut,
        refreshSession,
        refreshToken,
        accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  // Custom hook to use auth context
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthContext, AuthProvider, useAuth }
