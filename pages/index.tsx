import Link from 'next/link'
import Layout from 'src/app/components/Layout'
import { Form, Field } from 'react-final-form'
import { NexusGenArgTypes } from 'generated/nexus-typegen'
import { useMutation, useQueryClient } from 'react-query'
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

const IndexPage = () => {
  const queryClient = useQueryClient()
  const gqlClient = useGraphqlClient()

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
          return oldUsers ? [...oldUsers, newUser] : [newUser]
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
    <Layout title="">
      <div className="min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Form
              onSubmit={handleSubmit}
              render={({ handleSubmit }) => (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <Field
                    name="email"
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    render={({ input }) => (
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <div className="mt-1">
                          <input
                            {...input}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    )}
                  />

                  <Field
                    name="firstName"
                    id="firstName"
                    required
                    render={({ input }) => (
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First Name
                        </label>
                        <div className="mt-1">
                          <input
                            {...input}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    )}
                  />

                  <Field
                    name="lastName"
                    id="lastName"
                    required
                    render={({ input }) => (
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First Name
                        </label>
                        <div className="mt-1">
                          <input
                            {...input}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    )}
                  />

                  <Field
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    render={({ input }) => (
                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <div className="mt-1">
                          <input
                            {...input}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    )}
                  />

                  <div className="flex items-center justify-between">
                    <Field
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      render={({ input }) => (
                        <div className="flex items-center">
                          <input
                            {...input}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor="remember_me"
                            className="ml-2 block text-sm text-gray-900"
                          >
                            Remember me
                          </label>
                        </div>
                      )}
                    />

                    <div className="text-sm">
                      <Link href="/forgot-password">
                        <a
                          href="/forgot-password"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Forgot your password?
                        </a>
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Create your account
                    </button>
                  </div>
                </form>
              )}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
