import { NextApiRequest, NextApiResponse } from 'next'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { prisma } from 'server/prisma'
import {
  RefreshTokenPayload,
  createAccessToken,
  createRefreshToken
} from 'server/utils/authTokens'
import sendRefreshToken from 'server/utils/sendRefreshToken'
import { NexusGenObjects } from 'src/generated/nexus-typegen'

export const getAccessTokenFromRefreshToken = async (
  refreshToken: string
): Promise<{
  ok: boolean
  accessToken: string
  payload?: RefreshTokenPayload
  user?: NexusGenObjects['User']
}> => {
  if (!refreshToken) {
    return { accessToken: '', ok: false }
  }

  let payload:
    | null
    | { [key: string]: any }
    | string
    | RefreshTokenPayload = null

  try {
    payload = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!)
  } catch (err) {
    return { accessToken: '', ok: false }
  }

  if (
    !payload ||
    typeof payload === 'string' ||
    !payload.userId ||
    !payload.tokenVersion
  ) {
    return { accessToken: '', ok: false }
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      tokenVersion: true
    }
  })

  if (!user || user.tokenVersion !== payload.tokenVersion) {
    return { accessToken: '', ok: false }
  }

  return {
    accessToken: createAccessToken({ userId: user.id }),
    ok: true,
    payload: payload as RefreshTokenPayload,
    user
  }
}

const next = () => {}

export default async function handler(
  req: NextApiRequest | any,
  res: NextApiResponse | any
) {
  cookieParser()(req, res, next)

  // check if refresh token exists and is valid
  // check if user exists from refresh token payload
  // check if refresh token version is in sync with user token version
  // create new refresh token and access token
  // send new access token and refresh token

  const refreshToken = req.cookies.rt
  const { accessToken, ok, payload } = await getAccessTokenFromRefreshToken(
    refreshToken
  )

  if (ok) {
    sendRefreshToken(createRefreshToken(payload!), res)
  }

  return res.send({ accessToken, ok })
}
