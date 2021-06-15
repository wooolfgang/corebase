import React, { ReactNode } from 'react'
import Head from 'next/head'
import Nav from 'src/app/components/Nav'

type Properties = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = '' }: Properties) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <Nav />
    </header>
    {children}
    <footer></footer>
  </div>
)

export default Layout
