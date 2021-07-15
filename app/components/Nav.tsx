import React from 'react'
import Link from 'app/components/Link'
import { NexusGenObjects } from 'generated/nexus-typegen'
interface Props {
  className?: string
  user?: NexusGenObjects['User']
  isSkeleton?: boolean
  handleLogout?: () => void
  isLoggingOut?: boolean
}

const linkClassname = `text-base text-blue-700 underline mr-1.5 font-serif `

const Nav: React.FC<Props> = ({
  className,
  user,
  isSkeleton,
  handleLogout,
  isLoggingOut
}) => {
  return (
    <nav className={`${className} w-full`}>
      {user ? (
        <div className={`w-full flex justify-between items-center`}>
          <Link href="/" className={`${linkClassname} font-serif italic`}>
            {user.email}
          </Link>
          <div className="flex items-center">
            {' '}
            <Link href="/users" className={linkClassname}>
              Users
            </Link>
            <button className={linkClassname} onClick={handleLogout}>
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      ) : isSkeleton ? (
        <div className={`w-full flex justify-between`}>
          <span className="rounded-full border-2 border-solid border-blue-500 w-8 h-8 flex items-center justify-center text-lg font-serif italic"></span>
          <div className="flex items-center">
            {' '}
            <Link href="/users" className={linkClassname}>
              Users
            </Link>
            <button className={linkClassname} disabled>
              Logout
            </button>
          </div>
        </div>
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
    </nav>
  )
}

export default Nav
