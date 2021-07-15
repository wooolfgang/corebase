import React from 'react'
import { Form, Field } from 'react-final-form'
import { NexusGenArgTypes } from 'generated/nexus-typegen'
import { useMutation } from 'react-query'
import { gql, GraphQLClient } from 'graphql-request'
import { useGraphqlClient } from 'app/hooks/useGraphqlClient'
import Input from 'app/components/Input'
import Button from 'app/components/Button'
import { useStore } from 'app/store/auth'
import { useRouter } from 'next/router'

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
  const router = useRouter()
  const gqlClient = useGraphqlClient() as GraphQLClient
  const { setAccessToken } = useStore()

  function handleSubmit(values: NexusGenArgTypes['Mutation']['signup']) {
    signup(values)
  }

  const { mutate: signup, isLoading, error } = useMutation(
    async (values: NexusGenArgTypes['Mutation']['signup']) => {
      return await gqlClient.request(SignupMutation, values)
    },
    {
      onSuccess: data => {
        setAccessToken(data.signup.accessToken)
        router.push('/')
      }
    }
  )

  return (
    <Form
      onSubmit={handleSubmit}
      validate={values => {
        const errors: {
          email?: string
          password?: string
        } = {}

        if (!values.email) {
          errors.email = 'Please input your email'
        }
        if (values.email && !values.email.includes('@')) {
          errors.email = 'Please input a valid email'
        }
        if (!values.password) {
          errors.password = 'Please input your password'
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
                error={meta.touched && meta.error}
                {...input}
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
          <div className="flex flex-col items-end mt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="font-serif px-2 py-1 text-white text-base font-medium text-right border-b-2 border-r-2 border-solid border-blue-600 bg-blue-500 focus:outline-none focus:ring-2 focus:border-blue-800 "
            >
              {isLoading ? 'Creating...' : 'Create your account'}
            </Button>
            {error && (
              <span className="text-sm text-red-600 mt-1">
                {(error as any).response.errors[0].message}
              </span>
            )}
          </div>
        </form>
      )}
    />
  )
}

export default RegisterUserForm
