/* eslint-disable no-unused-vars */
import { NextApiRequest } from 'next'
import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'
import { Context } from '../context'
import { AccessTokenPayload } from './authTokens'
import { NexusGenRootTypes } from 'src/generated/nexus-typegen'

export interface AuthInterface {
  isAuthenticated: (ctx: Context) => Promise<boolean>
  getAccessToken: () => string | null
  getUser: (
    ctx: Context
  ) => Promise<NexusGenRootTypes['User'] | null | undefined>
}

class Auth {
  req: NextApiRequest
  prisma: PrismaClient
  ctx?: Context

  constructor(props: { req: NextApiRequest; prisma: PrismaClient }) {
    this.req = props.req
    this.prisma = props.prisma

    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.getAccessToken = this.getAccessToken.bind(this)
    this.getUser = this.getUser.bind(this)
  }

  async isAuthenticated(ctx: Context) {
    if (ctx?.userId) return true

    const accessToken = this.getAccessToken()

    if (!accessToken) {
      return false
    }

    try {
      const payload = (await verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET!
      )) as AccessTokenPayload

      // Attach userId to context
      ctx.userId = payload.userId

      return true
    } catch {
      return false
    }
  }

  getAccessToken() {
    const tokenValue = this.req.headers.authorization
    if (!tokenValue) {
      return null
    }
    return tokenValue.split(' ')[1]
  }

  async getUser(ctx: Context) {
    if (!ctx.userId) return null
    return this.prisma?.user.findUnique({ where: { id: ctx.userId } })
  }
}

export default Auth
