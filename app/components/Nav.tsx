import React from 'react'
import Link from 'app/components/Link'
import { NexusGenObjects } from 'generated/nexus-typegen'
interface Props {
  className?: string
  user?: NexusGenObjects['User']
  isSkeleton?: boolean
  handleLogout?: () => void
}

const linkClassname = `text-base text-blue-700 underline mr-1.5 font-serif `

const Nav: React.FC<Props> = ({
  className,
  user,
  isSkeleton,
  handleLogout
}) => {
  return (
    <header className={className}>
      {isSkeleton ? (
        <>
          <span>Welcome, </span>
          <Link href="/register" className={linkClassname}>
            Register
          </Link>
          <button className={linkClassname} onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : user ? (
        <>
          <span>Welcome, {user.email}</span>
          <Link href="/register" className={linkClassname}>
            Register
          </Link>
          <button className={linkClassname} onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/" className={linkClassname}>
            Login
          </Link>
          <Link href="/register" className={linkClassname}>
            Register
          </Link>
        </>
      )}
    </header>
  )
}

export default Nav
