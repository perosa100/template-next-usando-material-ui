import { useContext, createContext, useState, useEffect } from 'react'
import Router from 'next/router'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from 'services/apiClient'
import {
  NEXT_COOKIE_TOKEN,
  NEXT_COOKIE_TOKEN_REFRESH
} from './CONSTANTES_TOKEN'
import {
  AuthContextData,
  AuthProviderProps,
  SignInCreditials,
  User
} from './intefaceContext'

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel

export function signOut() {
  destroyCookie(undefined, NEXT_COOKIE_TOKEN)
  destroyCookie(undefined, NEXT_COOKIE_TOKEN_REFRESH)

  authChannel.postMessage('signOut')

  Router.push('/auth/login')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = Boolean(user)

  useEffect(() => {
    function handleChannelIncomingMessage(e: MessageEvent) {
      switch (e.data) {
        case 'signOut':
          signOut()
          break

        default:
          break
      }
    }

    authChannel = new BroadcastChannel('auth')

    authChannel.addEventListener('message', handleChannelIncomingMessage)

    return () => {
      authChannel.removeEventListener('message', handleChannelIncomingMessage)
    }
  }, [])

  useEffect(() => {
    const cookies = parseCookies()

    const token = cookies[NEXT_COOKIE_TOKEN]

    if (token) {
      api
        .get('/me')
        .then((response) => {
          const { email, permissions, roles, avatar, name } = response.data

          setUser({
            email,
            permissions,
            roles,
            avatar,
            name
          })
        })
        .catch(() => {
          signOut()
        })
    }
  }, [])

  async function signIn({ email, password }: SignInCreditials) {
    try {
      const response = await api.post('sessions', {
        email,
        password
      })

      const { permissions, roles, avatar, name, token, refreshToken } =
        response.data

      setCookie(undefined, NEXT_COOKIE_TOKEN, token, {
        maxAge: 60 * 60 * 24 * 30, //30 dias,
        path: '/'
      })
      setCookie(undefined, NEXT_COOKIE_TOKEN_REFRESH, refreshToken, {
        maxAge: 60 * 60 * 24 * 30, //30 dias,
        path: '/'
      })

      setUser({
        avatar,
        name,
        email,
        permissions,
        roles
      })

      api.defaults.headers.Authorization = `Bearer ${token}`

      Router.push('/dashboard')
    } catch (err) {
      alert(err)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        user,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
