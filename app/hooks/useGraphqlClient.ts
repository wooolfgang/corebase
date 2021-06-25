import { useRef } from 'react'
import { GraphQLClient } from 'graphql-request'
import { useStore } from 'app/store/graphql'

export const useGraphqlClient = (): GraphQLClient => {
  const gqlClientRef = useRef(useStore().client!)
  return gqlClientRef.current
}
