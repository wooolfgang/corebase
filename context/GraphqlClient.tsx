import React, { useContext } from 'react'

type ContextState = any

const GraphqlClientContext = React.createContext<ContextState | null>(null)

export const useGraphqlClient = (): ContextState => {
  return useContext(GraphqlClientContext)
}

export const GraphqlClientProvider: React.FC<{
  children: any
  client: any
}> = ({ children, client }) => (
  <GraphqlClientContext.Provider value={client}>
    {children}
  </GraphqlClientContext.Provider>
)

export default { GraphqlClientProvider, useGraphqlClient }
