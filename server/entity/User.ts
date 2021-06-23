import { objectType, extendType, nonNull, stringArg } from 'nexus'
import { createAccessToken, createRefreshToken } from 'server/utils/authTokens'
import sendRefreshToken from 'server/utils/sendRefreshToken'
import argon2 from 'argon2'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id')
    t.string('email')
    t.string('firstName')
    t.string('lastName')
  }
})

export const AuthRes = objectType({
  name: 'AuthRes',
  definition(t) {
    t.string('id')
    t.string('email'), t.string('accessToken')
  }
})

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('users', {
      type: 'User',
      authorize: (_, __, ctx) => {
        return ctx.auth!.isAuthenticated()
      },
      resolve(_root, _args, ctx) {
        return ctx.prisma.user.findMany()
      }
    })
  }
})

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'AuthRes',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        firstName: stringArg(),
        lastName: stringArg()
      },
      async resolve(_, args, ctx) {
        const { email, password, firstName, lastName } = args
        const passwordHashed = await argon2.hash(password)

        let user

        try {
          user = await ctx.prisma.user.create({
            data: {
              email,
              password: passwordHashed,
              firstName,
              lastName
            }
          })
        } catch (err) {
          if (String(err).includes('Unique constraint failed')) {
            throw new Error('Failed to create already existing user')
          } else {
            throw new Error('An error occured during user registration')
          }
        }

        const accessToken = createAccessToken({ userId: user.id })
        const refreshToken = createRefreshToken({
          userId: user.id,
          tokenVersion: user.tokenVersion
        })

        sendRefreshToken(refreshToken, ctx.res!)

        return {
          id: user.id,
          email: user.email,
          accessToken
        }
      }
    }),
      t.field('login', {
        type: 'AuthRes',
        args: {
          email: nonNull(stringArg()),
          password: nonNull(stringArg())
        },
        async resolve(_, args, ctx) {
          const { email, password } = args
          const user = await ctx.prisma.user.findUnique({ where: { email } })

          if (!user) {
            throw new Error('Failed to authenticate user')
          }

          const isPasswordCorrect = await argon2.verify(user.password, password)

          if (!isPasswordCorrect) {
            throw new Error('Failed to resolve login')
          }

          const accessToken = createAccessToken({ userId: user.id })
          const refreshToken = createRefreshToken({
            userId: user.id,
            tokenVersion: user.tokenVersion
          })

          sendRefreshToken(refreshToken, ctx.res!)

          return {
            accessToken,
            email: user.email,
            id: user.id
          }
        }
      })
  }
})
