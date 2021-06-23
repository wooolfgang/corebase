import cors from 'cors'
import cookieParser from 'cookie-parser'
import { NextApiRequest, NextApiResponse } from 'next'
import { createServer } from 'server'

export const config = {
  api: {
    bodyParser: false
  }
}

const next = () => {}

export default async function handler(
  req: NextApiRequest | any,
  res: NextApiResponse | any
) {
  cookieParser()(req, res, next)
  cors()(req, res, next)

  const server = createServer(req, res)
  await server.createHandler({
    path: '/api/graphql'
  })(req, res)
}
