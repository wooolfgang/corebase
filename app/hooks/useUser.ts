import { useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import { useGraphqlClient } from 'app/hooks/useGraphqlClient'
import { gql } from 'graphql-request'
import { setAccessToken } from 'app/lib/graphqlClient'
import { NexusGenObjects } from 'generated/nexus-typegen'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import shallow from 'zustand/shallow'
import { useStore } from '../store/auth'

const LoggedInUserQuery = gql`
  query {
    me {
      id
      email
      firstName
      lastName
    }
  }
`

interface UserPayload {
  isAuthenticating: boolean
  isPossiblyLoggedIn: boolean
  user: NexusGenObjects['User'] | null
  accessToken: string | null
}

interface InitialProps {
  accessToken?: string
  user?: NexusGenObjects['User']
}

export const useUser = (props?: InitialProps): UserPayload => {
  const { accessToken, user, setUser } = useStore(
    state => ({
      accessToken: state.accessToken,
      user: state.user,
      setUser: state.setUser
    }),
    shallow
  )

  const gqlClient = useGraphqlClient()
  const { isLoading, isSuccess, data } = useQuery<
    NexusGenObjects['User'],
    Error
  >(
    'logged-in-user',
    async () => (await gqlClient.request(LoggedInUserQuery)).me,
    {
      enabled: !user && Boolean(accessToken),
      initialData: props?.user,
      retry: false
    }
  )

  // Optimistic checking if a user is authenticated by checking the validity of accessToken
  // Useful to avoid flash of unauthenticated html when the app is still querying the logged in user
  const isPossiblyLoggedIn = useMemo(() => {
    if (!accessToken) return false
    const { exp } = jwtDecode<JwtPayload>(accessToken)
    if (Date.now() >= exp! * 1000) {
      return false
    }
    return true
  }, [accessToken])

  // Populate the auth store with the initial props
  // Also attach the accessToken to the graphql client
  useEffect(() => {
    if (props?.user) {
      setUser(props?.user)
    }
    if (props?.accessToken) {
      setAccessToken(props?.accessToken)
    }
  }, [props?.accessToken, props?.user, setUser])

  // Update the user on auth store once query is finished
  useEffect(() => {
    if (isSuccess && data) {
      setUser(data)
    }
  }, [data, setUser, isSuccess])

  return {
    isPossiblyLoggedIn,
    user,
    accessToken,
    isAuthenticating: isLoading
  }
}

export default useUser
