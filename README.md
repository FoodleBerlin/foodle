## Foodle 
A licensed kitchen rental service. 
## Setup

1. `yarn` to install deps.
2. Add a `.env.local` file to the root, all the environment variables will be sent to you by one of the teammates over a private Slack message. 

## Development

### Server

1. `yarn db:up` to start the database
2. `yarn prisma:migrate:deploy` to project the generated migration from prisma.schema onto your database
3. `yarn nexus:watch` to generate the graphql.schema
4. `yarn dev` to start the server in development
5. navigate to "localhost:5000/graphql" for the apollo interface where you can manually test queries/mutations
6. `yarn db:seed` to seed the database.

### Client

1. Ensure the dev server is on and run `yarn codegen:generate`
2. `yarn next:dev` to run the file watcher. front end should be accessible at localhost:3000
   NOTE: when you change front end queries or mutations to the backend you need to manually run step 1 again.

## Api Tests

1. Important: Dev Server needs to be stopped.
2. `yarn test:api` to start the test

### Foodle's Architecture
![FoodleArchitecture](https://user-images.githubusercontent.com/50741293/165260033-f6c8e0aa-8c24-45b6-8b54-427525527121.png)

### Repository Structure
- This repository has a monolithic architecture
- The web pages can be found /pages and the reusable components for these pages under /components
- Global SCSS styles can be found under /styles
- The Prisma schema and migrations made from it can be found under /prisma
- The Nexus Generated GraphQL schema can be found under server/generated/schema.graphql
- Code Definitons for GraphQL queries, mutations and types can be found under server/graphql/types
- Authentication relevant functions can be found under server/passport.ts as well as server/index.ts and utils/forgeJWT

### Server Architecture
![FoodleServerArchitecture](https://user-images.githubusercontent.com/50741293/165266675-fbf2f9f0-2375-4f8a-83c7-52bf80636872.png)

### Server Tech Stack 
-  Prisma: An Object-Relational Mapper that migrates changes to its schema to an SQL schema on command. 
-	NexusJS: A schema generator for GraphQL APIs. It can use code definitions for types, queries, and mutations to generate a GraphQL schema that we can interact with. Furthermore, the Prisma client can use these code definitions to interact with the PostgreSQL database.   
-	Apollo-Express Server: A GraphQL Server handling CRUD operations called from the frontend. In addition, this server can handle REST requests to handle our Google OAuth authentication process that goes through PassportJS middleware. 

### Client Tech Stack
- Next.Js + React.Js: ReactJs and the framework Next.Js built on top of it are used for routing, state management, server-side-rendering, CRUD requests from the Next API to our AWS S3 bucket, and much more.
- GraphQL CodeGen: Uses raw GraphQL queries to generates types (for our TypeScript code definitions) and react hooks to query our Server.
- Apollo Client: Also used to query our Server (but will be removed soon since it does not offer the same type safety as Codegen hooks)
- SCSS Modules: For component level styles
- 7-1 SCSS Architecture: For global styles and utility classes.

### Authentication
Currently we have authentication done through Google's OAuth process, facilitated by PassportJS and some ExpressJS routes. 
![Foodle Authentication](https://user-images.githubusercontent.com/50741293/165271388-52ce8c88-a135-4561-9673-3e20ca5fd0fd.png)
<br>
This flow looks roughly as above (from [The Net Ninja](https://www.youtube.com/watch?v=nK6fkNShhGc&ab_channel=TheNetNinja)), except that we have a PostgreSQL database instead of a MongoDB NoSQL database. Any protected NextJS route checks for a valid JWT cookie and redirects users to the home page if they are not authenticated. 
