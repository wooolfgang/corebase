# Corebase

Corebase is a graphql-first code template to bootstrap development of web applications. It scaffolds type definitions using [Nexus](https://nexusjs.org/) that allows you to create fully-typed applications from back-to-front with [Typescript](typescriptlang.org). It comes with a default authentication implementation, and uses modern technologies such as [NextJS](https://nextjs.org/), [Prisma](https://www.prisma.io/), and [TailwindCSS](https://tailwindcss.com/) which offers wonderful DX. Lastly, [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) defaults are initialized in order for you to be productively coding right off the bat!

### Requirements

- [Node.js 12.0](https://nodejs.org/en/) or later
- [Postgres 12.0](https://www.postgresql.org/) or later
- [Docker](https://www.docker.com/)
- [Npx](https://www.npmjs.com/package/npx)

### Initializing the project

Run these commands in ascending order.

1. `cp .env.example .env`
2. `cd db && docker-compose up -d`
3. `cd .. && npx prisma migrate dev` (or run the command from root dir)

### Getting started

| Command         | Action                                      |
| :-------------- | :------------------------------------------ |
| `npm install`   | Installs dependencies                       |
| `npm run start` | Starts local dev server at `localhost:3000` |
| `npm run build` | Build your production site to `./dist/`     |

### Using [Prisma Studio](https://www.prisma.io/studio)

```
  cd prisma
  npx prisma studio
```

### Documentation

For advanced documentation, please refer to the following

- NextJS => https://nextjs.org/
- Prisma => https://www.prisma.io/
- TailwindCSS => https://tailwindcss.com/

### References:

- https://egghead.io/lessons/postgresql-set-up-and-run-a-postgresql-instance-locally-with-docker-compose?pl=build-a-full-stack-app-with-prisma-2-7c81
- https://dev.to/prisma/complete-introduction-to-fullstack-type-safe-graphql-feat-next-js-nexus-prisma-c5
- https://medium.com/dooboolab/how-to-set-up-a-graphql-server-with-apollo-server-prisma2-and-nexus-schema-f59aa23b5d5d
- https://zach.codes/nexus-prisma-is-the-future-of-backend/
- https://telmo.is/writing/add-prettier-and-eslint-to-your-nextjs-app

#### Prisma

- https://github.com/catalinmiron/awesome-prisma
- https://github.com/prisma/prisma-examples

#### Authentication

- https://www.youtube.com/watch?v=25GS0MLT8JU
- https://github.com/benawad/jwt-auth-example
- https://javascript.plainenglish.io/next-js-using-cookies-in-getserversideprops-89c03a216b0b
