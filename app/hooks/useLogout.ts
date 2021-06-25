import { useMutation, useQueryClient } from 'react-query'
import { useGraphqlClient } from 'app/hooks/useGraphqlClient'
import { gql } from 'graphql-request'
import { useStore } from 'app/store/auth'

const LogoutMutation = gql`
  mutation {
    logout
  }
`

const useLogout = () => {
  const queryClient = useQueryClient()
  const gqlClient = useGraphqlClient()
  const revokeAuth = useStore(state => state.revokeAuth)

  const { mutate, isLoading, isSuccess, ...rest } = useMutation(
    async () => await gqlClient.request(LogoutMutation, {}),
    {
      onSuccess: () => {
        queryClient.clear()
        revokeAuth()
      }
    }
  )

  const handleLogout = () => {
    mutate()
  }

  return {
    handleLogout,
    isLoading,
    isSuccess,
    ...rest
  }
}

export default useLogout
