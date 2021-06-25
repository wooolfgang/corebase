import { GraphQLClient } from 'graphql-request'
import create from 'zustand/vanilla'
import createReactStore from 'zustand'

interface GraphqlStoreInterface {
  client: null | GraphQLClient
  // eslint-disable-next-line no-unused-vars
  setClient: (client: GraphQLClient) => void
}

export const store = create<GraphqlStoreInterface>(set => ({
  client: null,
  setClient: client => set(() => ({ client }))
}))

export const useStore = createReactStore(store)
