import React from 'react'
import Nav from 'src/app/components/Nav'
import LoginUserForm from 'src/app/containers/LoginUserForm'
import Layout from 'app/components/Layout'
import useUser from 'src/app/hooks/useUser'
import { getAccessTokenFromRefreshToken } from 'pages/api/refresh_token'
import skipOnClientSideNav from 'src/app/lib/skipOnClientSideNav'
import { GetServerSidePropsContext } from 'next'
import useLogout from 'src/app/hooks/useLogout'

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

const App: React.FC<Props> = props => {
  const { isPossiblyLoggedIn, user } = useUser(props)
  const { handleLogout } = useLogout()
  return (
    <Layout title="">
      <div className="flex items-center justify-center w-full flex-col pt-32">
        <div className="w-80">
          {user ? (
            <>
              <Nav className="mb-3" user={user} handleLogout={handleLogout} />
              <div>Actual result</div>
            </>
          ) : isPossiblyLoggedIn ? (
            <>
              <Nav className="mb-3" isSkeleton />
              <div>
                <p> Skeleton here...</p>
              </div>
            </>
          ) : (
            <>
              <Nav className="mb-3" />
              <LoginUserForm className="w-full" />
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default App
