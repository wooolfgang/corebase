import React from 'react'
import { Form, Field } from 'react-final-form'
import { NexusGenArgTypes } from 'generated/nexus-typegen'
import { useMutation, useQueryClient } from 'react-query'
import { gql } from 'graphql-request'
import { useGraphqlClient } from 'app/context/GraphqlClient'
import Input from 'app/components/Input'

interface Props {
  className?: string
}

const LoginUserForm: React.FC<Props> = ({ className }) => {
  const handleSubmit = () => {}

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
              className="rounded-sm font-serif px-2 text-blue-700 font-medium text-right border-2 border-solid border-blue-600"
            >
              Login your account
            </button>
          </div>
        </form>
      )}
    />
  )
}

export default LoginUserForm
