import { useMutation, useQueryClient } from 'react-query'
import { useGraphqlClient } from 'app/hooks/useGraphqlClient'
import { gql } from 'graphql-request'
import { useStore } from 'app/store/auth'
import noop from 'app/lib/noop'

const LogoutMutation = gql`
  mutation {
    logout
  }
`

export const useLogout = (params?: { onSuccess: () => void }) => {
  const { onSuccess = noop } = params || { onSuccess: noop }
  const queryClient = useQueryClient()
  const gqlClient = useGraphqlClient()
  const revokeAuth = useStore(state => state.revokeAuth)

  const { mutate, isLoading, isSuccess, ...rest } = useMutation(
    async () => await gqlClient.request(LogoutMutation, {}),
    {
      onSuccess: () => {
        queryClient.clear()
        revokeAuth()
        onSuccess()
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
