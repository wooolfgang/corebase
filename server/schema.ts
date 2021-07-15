import { makeSchema, fieldAuthorizePlugin } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import path from 'path'
import * as types from 'server/entity'

export const schema = makeSchema({
  types,
  plugins: [nexusPrisma({ experimentalCRUD: true }), fieldAuthorizePlugin()],
  contextType: {
    module: path.join(process.cwd(), '/server/context.ts'),
    export: 'Context'
  },
  outputs: {
    typegen: path.join(process.cwd(), 'generated/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'generated/schema.graphql')
  },
  prettierConfig: path.join(process.cwd(), '.prettierrc.js')
})
