import React from 'react'
import Nav from 'app/components/Nav'
import UserList from 'app/containers/UserList'
import Layout from 'app/components/Layout'
import { getAccessTokenFromRefreshToken } from 'pages/api/refresh_token'
import { GetServerSidePropsContext } from 'next'
import skipOnClientSideNav from 'app/lib/skipOnClientSideNav'
import useLogout from 'app/hooks/useLogout'
import useUser from 'app/hooks/useUser'
import { useRouter } from 'next/router'

async function getProps(ctx: GetServerSidePropsContext) {
  const refreshToken = ctx.req.cookies.rt
  const { accessToken, user } = await getAccessTokenFromRefreshToken(
    refreshToken
  )
  return { props: { accessToken, user: user || null } }
}

export const getServerSideProps = skipOnClientSideNav(getProps)

interface Props {
  accessToken?: string
}

const Users: React.FC<Props> = props => {
  const router = useRouter()
  const { isPossiblyLoggedIn, user } = useUser(props)

  const logoutRedirect = () => {
    router.push('/')
  }

  const { handleLogout, isLoading } = useLogout({ onSuccess: logoutRedirect })
  return (
    <Layout title="">
      <div className="flex items-center justify-center w-full flex-col pt-32">
        <div className="w-80">
          <Nav
            className="mb-3"
            user={user || undefined}
            handleLogout={handleLogout}
            isLoggingOut={isLoading}
            isSkeleton={isPossiblyLoggedIn}
          />
          <UserList />
        </div>
      </div>
    </Layout>
  )
}

export default Users
