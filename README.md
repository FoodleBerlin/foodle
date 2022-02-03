## Development

1. `yarn` to install deps.
2. `yarn db:up` to start the database
3. Add a .env.local file to the root and set DATABASE_URL to the string commented in the docker-compose.yml file
4. `yarn prisma:migrate:deploy` to project the generated migration from prisma.schema onto your database
5. `yarn nexus:watch` to generate the graphql.schema
6. `yarn dev` to start the server in development
7. navigate to "localhost:5000/graphql" for the apollo interface where you can manually test queries/mutations
