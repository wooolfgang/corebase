import { ApolloServer } from 'apollo-server-micro'
import { schema } from 'src/graphql/schema'
import { context } from 'src/graphql/context'

const server = new ApolloServer({
  schema,
  context
})

export default server
