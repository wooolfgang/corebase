import { objectType, extendType, nonNull, stringArg } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id')
    t.string('email')
    t.string('firstName')
    t.string('lastName')
  }
})

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('users', {
      type: 'User',
      resolve(_root, _args, ctx) {
        return ctx.db.user.findMany()
      }
    })
  }
})

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'User',
      args: {
        email: nonNull(stringArg()),
        firstName: stringArg(),
        lastName: stringArg()
      },
      resolve(_root, args, ctx) {
        const user = {
          email: args.email,
          firstName: args.firstName,
          lastName: args.lastName
        }
        return ctx.db.user.create({ data: user })
      }
    })
  }
})
