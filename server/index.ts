import { ApolloServer } from 'apollo-server-micro'
import { schema } from 'server/schema'
import { createContext } from 'server/context'
import { NextApiRequest, NextApiResponse } from 'next'

export const createServer = (req: NextApiRequest, res: NextApiResponse) =>
  new ApolloServer({
    schema,
    context: createContext(req, res)
  })
