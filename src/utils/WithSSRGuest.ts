import { NEXT_COOKIE_TOKEN } from 'contexts/CONSTANTES_TOKEN'
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next'
import { parseCookies } from 'nookies'

export function withSSRQuest<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)
    const token = cookies[NEXT_COOKIE_TOKEN]

    if (token) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false
        }
      }
    }
    return await fn(ctx)
  }
}
