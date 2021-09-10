import axios, { AxiosError } from 'axios'
import { signOut } from 'contexts/AuthContext'
import {
  NEXT_COOKIE_TOKEN,
  NEXT_COOKIE_TOKEN_REFRESH
} from 'contexts/CONSTANTES_TOKEN'

import { parseCookies, setCookie } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError'

let isRefresing = false

let failedRequestQueue: {
  onSuccess: (token: string) => void
  onfFailure: (err: AxiosError<any>) => void
}[] = []

export function setupApiClient(ctx = undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies[NEXT_COOKIE_TOKEN]}`
    }
  })

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (error.response.data.code === 'token.expired') {
          //renova token
          cookies = parseCookies(ctx)

          const refreshToken = cookies[NEXT_COOKIE_TOKEN_REFRESH]

          const originalConfig = error.config

          if (!isRefresing) {
            isRefresing = true
            api
              .post('/refresh', {
                refreshToken
              })
              .then((response) => {
                const { token } = response.data

                setCookie(ctx, NEXT_COOKIE_TOKEN, token, {
                  maxAge: 60 * 60 * 24 * 30, //30 dias,
                  path: '/'
                })

                setCookie(
                  ctx,
                  NEXT_COOKIE_TOKEN_REFRESH,
                  response.data.refreshToken,
                  {
                    maxAge: 60 * 60 * 24 * 30, //30 dias,
                    path: '/'
                  }
                )

                api.defaults.headers.Authorization = `Bearer ${token}`

                failedRequestQueue.forEach((request) =>
                  request.onSuccess(token)
                )
                failedRequestQueue = []
              })
              .catch((err) => {
                failedRequestQueue.forEach((request) => request.onfFailure(err))
                failedRequestQueue = []

                if (process.browser) {
                  signOut()
                }
              })
              .finally(() => {
                isRefresing = false
              })
          }

          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers['Authorization'] = `Bearer ${token}`

                resolve(api(originalConfig))
              },
              onfFailure: (err: AxiosError) => {
                reject(err)
              }
            })
          })
        } else {
          //desloga
          if (process.browser) {
            signOut()
          } else {
            return Promise.reject(new AuthTokenError())
          }
        }
      }

      return Promise.reject(error)
    }
  )

  return api
}
