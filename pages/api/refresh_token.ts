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

  if (!refreshToken) {
    return res.send({ accessToken: '', ok: false })
  }

  let payload:
    | null
    | { [key: string]: any }
    | string
    | RefreshTokenPayload = null

  try {
    payload = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!)
  } catch (err) {
    return res.send({ accessToken: '', ok: false })
  }

  if (
    !payload ||
    typeof payload === 'string' ||
    !payload.userId ||
    !payload.tokenVersion
  ) {
    return res.send({ accessToken: '', ok: false })
  }

  const user = await prisma.user.findUnique({ where: { id: payload.userId } })
  if (!user || user.tokenVersion !== payload.tokenVersion) {
    return res.send({ accessToken: '', ok: false })
  }

  const accessToken = createAccessToken({ userId: user.id })

  sendRefreshToken(
    createRefreshToken({ userId: user.id, tokenVersion: user.tokenVersion }),
    res
  )

  return res.send({ accessToken, ok: true })
}
