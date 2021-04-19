import * as React from 'react'

import { User } from '../interfaces'

type ListDetailProperties = {
  item: User
}

const ListDetail = ({ item: user }: ListDetailProperties) => (
  <div>
    <h1>Detail for {user.name}</h1>
    <p>ID: {user.id}</p>
  </div>
)

export default ListDetail
