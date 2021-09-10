import React from 'react'
import Head from 'next/head'

const SEO: React.FC<SEOProps> = ({ description, title }) => (
  <Head>
    <title>{title}</title>
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={title} />
    <meta
      name="og:description"
      property="og:description"
      content={description}
    />
    {/*  <meta property="og:site_name" content="" />
    <meta property="og:url" content="" /> */}
    <meta property="og:image" content="" />
    <link rel="icon" type="image/png" href="/icons/icon-72x72.png" />
    <link
      rel="apple-touch-icon"
      type="image/png"
      href="/icons/icon-72x72.png"
    />
  </Head>
)

export interface SEOProps {
  description?: string
  lang?: string
  meta?: any[]
  keywords?: string[]
  title: string
}

export default SEO
