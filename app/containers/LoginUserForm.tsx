import React from 'react'
import { Form, Field } from 'react-final-form'
import Input from 'app/components/Input'
import { useGraphqlClient } from 'app/hooks/useGraphqlClient'
import { useMutation } from 'react-query'
import { gql } from 'graphql-request'
import { NexusGenArgTypes } from 'generated/nexus-typegen'
import { useStore } from 'app/store/auth'
import Button from 'app/components/Button'

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
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login your account'}
            </Button>
          </div>
        </form>
      )}
    />
  )
}

export default LoginUserForm
