## Development

1. `yarn` to install deps.

### Server

1. `yarn db:up` to start the database
2. Add a `.env.local` file to the root and set `DATABASE_URL` to the string commented in the docker-compose.yml file. Also set a `SERVER_SECRET` to any string value, and `GOOGLE_CLIENT_ID`, and `GOOGLE_CLIENT_SECRET` (ask a teammate for the value). Add `STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` (ask a teammate for the values).
3. `yarn prisma:migrate:deploy` to project the generated migration from prisma.schema onto your database
4. `yarn nexus:watch` to generate the graphql.schema
5. `yarn dev` to start the server in development
6. navigate to "localhost:5000/graphql" for the apollo interface where you can manually test queries/mutations
7. `yarn db:seed` to seed the database.

### Client

1. Ensure the dev server is on and run `yarn codegen:generate`
2. `yarn next:dev` to run the file watcher. front end should be accessible at localhost:3000
   NOTE: when you change front end queries or mutations to the backend you need to manually run step 1 again.

## Api Tests

1. Important: Dev Server needs to be stopped.
2. `yarn test:api` to start the test
