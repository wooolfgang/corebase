import { GraphQLClient } from 'graphql-request'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { store } from 'app/store/auth'
import fetchAccessToken from 'app/lib/fetchAccessToken'

const graphqlClient = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_SERVER_ORIGIN}/api/graphql`,
  {
    credentials: 'include'
  }
)

export function setAccessToken(token: string) {
  graphqlClient.setHeader('Authorization', `Bearer ${token}`)
  store.setState({ accessToken: token })
}

export function getAccessToken() {
  return store.getState().accessToken
}

export function isTokenExpired(token: string) {
  try {
    const { exp } = jwtDecode<JwtPayload>(token)
    if (!exp) return true
    if (Date.now() >= exp * 1000) {
      return true
    }

    return false
  } catch {
    return true
  }
}

// Override request function of graphqlClient to automatically update
// accessToken on expiry using the refreshToken
const request = graphqlClient.request
graphqlClient.request = async function (...args): Promise<any> {
  let token = getAccessToken()

  // check if token is expired or undefined.
  // if it is, refetch using refresh_token
  if (!token || isTokenExpired('asdad')) {
    try {
      token = await fetchAccessToken()
      setAccessToken(token)
    } catch {
      // do nothing
    }
  }

  return request.apply(this, args)
}

export default graphqlClient
