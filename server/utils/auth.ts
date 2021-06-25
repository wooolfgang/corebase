/* eslint-disable no-unused-vars */
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import { Context } from '../context'
import { AccessTokenPayload } from './authTokens'

export interface AuthInterface {
  isAuthenticated: (ctx?: Context) => Promise<boolean>
  getAccessToken: () => string | null
}

function Auth(
  req: NextApiRequest,
  res: NextApiResponse,
  prisma: PrismaClient | null | undefined
): AuthInterface {
  async function isAuthenticated(ctx?: Context) {
    const accessToken = getAccessToken()

    if (!accessToken) {
      return false
    }

    try {
      const payload = (await verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET!
      )) as AccessTokenPayload

      if (ctx) {
        // Attach userId to context
        ctx.userId = payload.userId
      }

      return true
    } catch {
      return false
    }
  }

  function getAccessToken() {
    const tokenValue = req.headers.authorization
    if (!tokenValue) {
      return null
    }
    return tokenValue.split(' ')[1]
  }

  return {
    isAuthenticated,
    getAccessToken
  }
}

export default Auth
