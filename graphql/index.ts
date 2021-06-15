import { ApolloServer } from 'apollo-server-micro'
import { schema } from 'graphql/schema'
import { context } from 'graphql/context'

const server = new ApolloServer({
  schema,
  context
})

export default server
