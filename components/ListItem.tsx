import React from 'react'
import Link from 'next/link'

import { User } from '../interfaces'

type Properties = {
  data: User
}

const ListItem = ({ data }: Properties) => (
  <Link href="/users/[id]" as={`/users/${data.id}`}>
    <a>
      {data.id}: {data.name}
    </a>
  </Link>
)

export default ListItem
