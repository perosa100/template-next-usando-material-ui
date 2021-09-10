/* eslint-disable  */
import React, { FC, useEffect } from 'react'
import { AppProps } from 'next/app'
import NextNprogress from 'nextjs-progressbar'
import { AuthProvider } from 'contexts/AuthContext'

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <AuthProvider>
      <NextNprogress
        color="#F231A5"
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
      />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
