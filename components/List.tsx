import * as React from 'react'
import ListItem from './ListItem'
import { User } from '../interfaces'

type Properties = {
  items: User[]
}

const List = ({ items }: Properties) => (
  <ul>
    {items.map(item => (
      <li key={item.id}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
)

export default List
