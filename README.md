### Re-creating the template

- npx create-next-app {project-name} --use-npm -e with-typescript
- npm add nexus && npm add graphql (https://nexusjs.org/docs/#installation)

| Command         | Action                                      |
| :-------------- | :------------------------------------------ |
| `npm install`   | Installs dependencies                       |
| `npm run start` | Starts local dev server at `localhost:3000` |
| `npm run build` | Build your production site to `./dist/`     |

### Setting up the backend

1. cd db && run docker-compose up -d
2. Run the initial migration: `npx prisma migrate dev --name init --preview-feature`

### Running a migration

`npx prisma migrate dev --name "your-migration-name" --preview-feature`

### Quick start

```
  npx prisma migrate dev
  npm run dev
```

### Viewing database models and data

```
  cd prisma
  npx prisma studio
```

### References:

- https://egghead.io/lessons/postgresql-set-up-and-run-a-postgresql-instance-locally-with-docker-compose?pl=build-a-full-stack-app-with-prisma-2-7c81
- https://dev.to/prisma/complete-introduction-to-fullstack-type-safe-graphql-feat-next-js-nexus-prisma-c5
- https://medium.com/dooboolab/how-to-set-up-a-graphql-server-with-apollo-server-prisma2-and-nexus-schema-f59aa23b5d5d
- https://zach.codes/nexus-prisma-is-the-future-of-backend/
- Adding Eslint-Prettier https://telmo.is/writing/add-prettier-and-eslint-to-your-nextjs-app

#### Prisma

- https://github.com/catalinmiron/awesome-prisma
- https://github.com/prisma/prisma-examples

#### Authentication

- https://www.youtube.com/watch?v=25GS0MLT8JU
- https://github.com/benawad/jwt-auth-example
- https://javascript.plainenglish.io/next-js-using-cookies-in-getserversideprops-89c03a216b0b
