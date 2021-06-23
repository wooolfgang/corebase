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
              className="font-serif px-2 py-1 text-white text-base font-medium text-right border-b-2 border-r-2 border-blue-600 bg-blue-500 focus:outline-none focus:ring-2 focus:border-blue-800 "
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
