import React from 'react'
import Nav from 'src/app/components/Nav'
import LoginUserForm from 'src/app/containers/LoginUserForm'
import Layout from 'app/components/Layout'

interface Props {}

const Login: React.FC<Props> = () => {
  return (
    <Layout title="">
      <div className="flex items-center justify-center w-full flex-col pt-20">
        <div className="w-80">
          <Nav className="mb-3" />
          <LoginUserForm className="w-full" />
        </div>
      </div>
    </Layout>
  )
}

export default Login
