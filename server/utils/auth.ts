/* eslint-disable no-unused-vars */
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'

export interface AuthInterface {
  isAuthenticated: () => Promise<boolean>
  getAccessToken: () => string | null
}

function Auth(
  req: NextApiRequest,
  res: NextApiResponse,
  prisma: PrismaClient | null | undefined
): AuthInterface {
  async function isAuthenticated() {
    const accessToken = getAccessToken()

    if (!accessToken) {
      return false
    }

    try {
      await verify(accessToken, process.env.ACCESS_TOKEN_SECRET!)
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
