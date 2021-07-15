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

  const { mutate: login, isLoading, error } = useMutation(
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
      validate={values => {
        const errors: {
          email?: string
          password?: string
        } = {}
        if (!values.email) {
          errors.email = 'Your email is required'
        }
        if (values.email && !values.email.includes('@')) {
          errors.email = 'Please input a valid email'
        }
        if (!values.password) {
          errors.password = 'Your password is not valid'
        }
        return errors
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={className}>
          <Field
            name="email"
            id="email"
            type="email"
            autoComplete="email"
            required
            render={({ input, meta }) => (
              <Input
                label={`Email address:`}
                {...input}
                error={meta.touched && meta.error}
              />
            )}
          />

          <Field
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            render={({ input, meta }) => (
              <Input
                label={`Password:`}
                error={meta.touched && meta.error}
                {...input}
              />
            )}
          />
          <div className="flex flex-col items-end mt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login your account'}
            </Button>
            {error && (
              <span className="text-sm text-red-600 mt-1">
                Incorrect username or password
              </span>
            )}
          </div>
        </form>
      )}
    />
  )
}

export default LoginUserForm
