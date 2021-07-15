import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { gql } from 'graphql-request'
import { NexusGenFieldTypes } from 'src/generated/nexus-typegen'
import { useGraphqlClient } from 'app/hooks/useGraphqlClient'
import Button from 'app/components/Button'

const UsersQuery = gql`
  query UsersQuery(
    $first: Int
    $last: Int
    $before: UserWhereUniqueInput
    $after: UserWhereUniqueInput
  ) {
    users(first: $first, last: $last, before: $before, after: $after) {
      id
      email
      firstName
      lastName
    }
  }
`

const UserList = () => {
  const PAGINATION = 2
  const gqlClient = useGraphqlClient()
  const [args, setArgs] = useState<{
    first: number
    after?: {
      id?: string | undefined
      email?: string | undefined
    }
  }>({ first: PAGINATION })

  const { data, isSuccess, isLoading, isError } = useQuery<
    Array<NexusGenFieldTypes['User']>,
    Error
  >(
    ['users', args],
    async () => (await gqlClient.request(UsersQuery, args)).users,
    {
      keepPreviousData: true
    }
  )

  function handleShowMore() {
    setArgs({
      first: args.first + PAGINATION
    })
  }

  return (
    <>
      {isSuccess && data && (
        <div className="mt-4 mb-2">
          {data.map(user => (
            <p className="block" key={user.id}>
              {user.email}
            </p>
          ))}
          <Button type="button" onClick={handleShowMore} className="mt-2">
            {' '}
            show more
          </Button>
        </div>
      )}
      {isLoading && <p>Loading users...</p>}
      {isError && <p className="text-red-600">Failed to query users</p>}
    </>
  )
}

export default UserList
