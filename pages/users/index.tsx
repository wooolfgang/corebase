import Link from 'next/link'
import { NexusGenObjects } from 'generated/nexus-typegen'
import Layout from 'src/app/components/Layout'
import CreateUserForm from 'src/app/containers/CreateUserForm'
import { NexusGenArgTypes } from 'generated/nexus-typegen'
import { useMutation, useQueryClient, useQuery } from 'react-query'
import { gql } from 'graphql-request'
import { useGraphqlClient } from 'src/app/context/GraphqlClient'

const mutation = gql`
  mutation createUser($email: String!, $firstName: String, $lastName: String) {
    signup(email: $email, firstName: $firstName, lastName: $lastName) {
      id
      email
    }
  }
`

const query = gql`
  query users {
    users {
      id
      email
      firstName
      lastName
    }
  }
`

const UsersPage = () => {
  const queryClient = useQueryClient()
  const gqlClient = useGraphqlClient()

  function useUsers() {
    return useQuery('users', async () => {
      return await gqlClient.request(query)
    })
  }
  const { data, isFetching } = useUsers()

  function handleSubmit(values: NexusGenArgTypes['Mutation']['signup']) {
    createUserMutation.mutate(values)
  }

  const createUserMutation = useMutation(
    async (values: NexusGenArgTypes['Mutation']['signup']) => {
      return await gqlClient.request(mutation, values)
    },
    {
      onMutate: async newUser => {
        await queryClient.cancelQueries('users')
        const previousValue = queryClient.getQueryData('users')
        queryClient.setQueryData('users', (oldUsers: any) => {
          return oldUsers
            ? { users: [...oldUsers.users, newUser] }
            : { users: [newUser] }
        })
        return previousValue
      },
      onError: (_err, _variables, previousValue): void => {
        queryClient.setQueryData('users', previousValue)
      },
      onSettled: (): void => {
        queryClient.invalidateQueries('users')
      }
    }
  )
  return (
    <Layout title="Users List | Next.js + TypeScript Example">
      <div className="flex flex-col w-2/3 m-auto mt-2.5">
        <div className="mb-10">
          <CreateUserForm handleSubmit={handleSubmit} />
        </div>
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isFetching
                    ? []
                    : data.users.map(
                        (
                          person: NexusGenObjects['User'],
                          personIdx: number
                        ) => (
                          <tr
                            key={person.email}
                            className={
                              personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            }
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {person.firstName} {person.lastName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {person.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link href={`/users/${person.id}`}>
                                <a
                                  href={`/users/${person.id}`}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  View User
                                </a>
                              </Link>
                            </td>
                          </tr>
                        )
                      )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UsersPage
