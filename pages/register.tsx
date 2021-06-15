import React from 'react'
import Layout from 'app/components/Layout'
import Nav from 'app/components/Nav'
import RegisterUserForm from 'app/containers/RegisterUserForm'

interface Props {}

const Register: React.FC<Props> = () => {
  return (
    <Layout title="Register">
      <div className="flex items-center justify-center w-full flex-col pt-20">
        <div className="w-80">
          <Nav className="mb-3" />
          <RegisterUserForm className="w-full" />
        </div>
      </div>
    </Layout>
  )
}

export default Register
