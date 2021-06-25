import React from 'react'
import { Form, Field } from 'react-final-form'
import { NexusGenArgTypes } from 'generated/nexus-typegen'
import { useMutation, useQueryClient } from 'react-query'
import { gql, GraphQLClient } from 'graphql-request'
import { useGraphqlClient } from 'app/hooks/useGraphqlClient'
import Input from 'app/components/Input'
import { useStore } from '../store/auth'

const SignupMutation = gql`
  mutation signup(
    $email: String!
    $firstName: String
    $lastName: String
    $password: String!
  ) {
    signup(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
    ) {
      id
      accessToken
    }
  }
`

interface Props {
  className?: string
}

const RegisterUserForm: React.FC<Props> = ({ className }) => {
  const queryClient = useQueryClient()
  const gqlClient = useGraphqlClient() as GraphQLClient
  const { setAccessToken } = useStore()

  function handleSubmit(values: NexusGenArgTypes['Mutation']['signup']) {
    signup(values)
  }

  const { mutate: signup, isLoading } = useMutation(
    async (values: NexusGenArgTypes['Mutation']['signup']) => {
      return await gqlClient.request(SignupMutation, values)
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
      onSuccess: data => {
        setAccessToken(data.signup.accessToken)
      },
      onSettled: (): void => {
        queryClient.invalidateQueries('users')
      }
    }
  )

  return (
    <Form
      onSubmit={handleSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={className}>
          <Field
            name="email"
            id="email"
            type="email"
            autoComplete="email"
            required
            render={({ input }) => (
              <Input label={`Email address:`} {...input} />
            )}
          />

          <Field
            name="firstName"
            id="firstName"
            required
            render={({ input }) => <Input label={`First name:`} {...input} />}
          />

          <Field
            name="lastName"
            id="lastName"
            required
            render={({ input }) => <Input label={`Last name:`} {...input} />}
          />

          <Field
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            render={({ input }) => <Input label={`Password:`} {...input} />}
          />
          <div className="flex flex-col items-end mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="font-serif px-2 py-1 text-white text-base font-medium text-right border-b-2 border-r-2 border-solid border-blue-600 bg-blue-500 focus:outline-none focus:ring-2 focus:border-blue-800 "
            >
              {isLoading ? 'Creating...' : 'Create your account'}
            </button>
          </div>
        </form>
      )}
    />
  )
}

export default RegisterUserForm
