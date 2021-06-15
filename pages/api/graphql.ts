import { ApolloServer } from 'apollo-server-micro'
import { schema } from 'src/graphql/schema'
import { context } from 'src/graphql/context'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import type { NextApiRequest, NextApiResponse } from 'next'

const server = new ApolloServer({
  schema,
  context
})

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

  await server.createHandler({
    path: '/api/graphql'
  })(req, res)
}
