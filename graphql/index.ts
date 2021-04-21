import { ApolloServer } from 'apollo-server-micro'
import { schema } from './schema'
import { context } from './context'

const server = new ApolloServer({
  schema,
  context
})

export default server
