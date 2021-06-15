import React, { ReactNode } from 'react'
import Head from 'next/head'

type Properties = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = '' }: Properties) => (
  <div className={`h-screen w-screen`}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
    <footer></footer>
  </div>
)

export default Layout
