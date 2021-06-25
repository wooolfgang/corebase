import { NextApiRequest, NextApiResponse } from 'next'
import Auth, { AuthInterface } from 'src/server/utils/auth'
import { PrismaClient } from '@prisma/client'
import { prisma } from 'server/prisma'

export interface Context {
  prisma: PrismaClient
  req?: NextApiRequest
  res?: NextApiResponse
  auth?: AuthInterface
  userId?: string
}

export const createContext = (
  req: NextApiRequest,
  res: NextApiResponse
): Context => ({
  req,
  res,
  prisma,
  auth: Auth(req, res, prisma)
})
