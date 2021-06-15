import React from 'react'
import Link from 'app/components/Link'
interface Props {
  className?: string
}

const linkClassname = `text-base text-blue-700 underline mr-1.5 font-serif `

const Nav: React.FC<Props> = ({ className }) => {
  return (
    <header className={className}>
      <Link href="/" className={linkClassname}>
        Login
      </Link>
      <Link href="/register" className={linkClassname}>
        Register
      </Link>
    </header>
  )
}

export default Nav
