import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next'
import { destroyCookie, parseCookies } from 'nookies'
import { AuthTokenError } from 'services/errors/AuthTokenError'
import { WithSSRAuthOptions } from './interfaceUtils'
import decode from 'jwt-decode'
import { validateUserPermissions } from './validateUserPermissions'
import {
  NEXT_COOKIE_TOKEN,
  NEXT_COOKIE_TOKEN_REFRESH
} from 'contexts/CONSTANTES_TOKEN'

export function withSSRAuth<P>(
  fn: GetServerSideProps<P>,
  options?: WithSSRAuthOptions
) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)
    const token = cookies[NEXT_COOKIE_TOKEN]

    if (!token) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false
        }
      }
    }

    if (options) {
      const user = decode<{ permissions: string[]; roles: string[] }>(token)

      const { permissions, roles } = options

      const userHasValidPermissions = validateUserPermissions({
        user,
        permissions,
        roles
      })

      if (!userHasValidPermissions) {
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    }

    try {
      return await fn(ctx)
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, NEXT_COOKIE_TOKEN)
        destroyCookie(ctx, NEXT_COOKIE_TOKEN_REFRESH)

        return {
          redirect: {
            destination: '/auth/login',
            permanent: false
          }
        }
      }
    }
  }
}
