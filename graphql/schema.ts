import { makeSchema } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import path from 'path'
import * as types from 'src/graphql/entity'

export const schema = makeSchema({
  types,
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  contextType: {
    module: path.join(process.cwd(), '/graphql/context.ts'),
    export: 'Context'
  },
  outputs: {
    typegen: path.join(process.cwd(), 'generated/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'generated/schema.graphql')
  }
})
