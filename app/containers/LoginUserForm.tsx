import React from 'react'
import { Form, Field } from 'react-final-form'
import Input from 'app/components/Input'
import { useGraphqlClient } from 'app/hooks/useGraphqlClient'
import { useMutation } from 'react-query'
import { gql } from 'graphql-request'
import { NexusGenArgTypes } from 'generated/nexus-typegen'
import { useStore } from 'app/store/auth'

const LoginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      accessToken
    }
  }
`

interface Props {
  className?: string
}

const LoginUserForm: React.FC<Props> = ({ className }) => {
  const graphqlClient = useGraphqlClient()
  const { setAccessToken } = useStore()

  const handleLogin = (values: NexusGenArgTypes['Mutation']['login']) => {
    login(values)
  }

  const { mutate: login, isLoading } = useMutation(
    async (values: NexusGenArgTypes['Mutation']['login']) => {
      return graphqlClient.request(LoginMutation, values)
    },
    {
      onSuccess: data => {
        setAccessToken(data.login.accessToken)
      }
    }
  )

  return (
    <Form
      onSubmit={handleLogin}
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
              className="font-serif px-2 py-1 text-white text-base font-medium text-right border-b-2 border-r-2 border-blue-600 bg-blue-500 focus:outline-none focus:ring-2 focus:border-blue-800 "
            >
              {isLoading ? 'Logging in...' : 'Login your account'}
            </button>
          </div>
        </form>
      )}
    />
  )
}

export default LoginUserForm
