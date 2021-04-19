import { makeSchema } from 'nexus'
import path from 'path'
import * as types from './modules'

export const schema = makeSchema({
  types,
  outputs: {
    typegen: path.join(process.cwd(), 'generated/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'generated/schema.graphql'),
  },
})