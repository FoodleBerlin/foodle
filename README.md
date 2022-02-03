## Development

`yarn dev` to install deps.

1. `yarn db:up` to start the database
2. `yarn prisma:migrate:deploy` to project the generated migration from prisma.schema onto your database
3. `yarn nexus:watch` to generate the graphql.schema
4. `yarn dev` to start the server in development
5. navigate to "localhost:5000/graphql" for the apollo interface where you can manually test queries/mutations
