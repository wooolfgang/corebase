import { objectType, extendType } from 'nexus'

export const User = objectType({
  name: 'User',          
  definition(t) {
    t.id('id')          
    t.string('firstName')     
    t.string('lastName')
  },
})

export const UserQuery = extendType({
  type: 'Query',                         
  definition(t) {
    t.field('user', {    
      type: 'User',        
      resolve(_root, _args) {
        return {
          id: '1',
          firstName: 'test',
          lastName: 'test'
        }
      }
    })
  },
})