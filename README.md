## Foodle

A licensed kitchen rental service.

## Setup Development

### Server

1. `cd server`
2. Add a `.env.local` file to the root of /server, all the environment variables will be sent to you by one of the teammates over a private Slack message.
3. `yarn` to install deps.
4. `yarn db:up` to start the database
5. `yarn prisma:migrate:deploy` to project the generated migration from prisma.schema onto your database
6. `yarn prisma:generate` to generate the prisma client
7. `yarn nexus:watch` to generate the graphql.schema
8. `yarn dev` to start the server in development
9. navigate to "localhost:5000/graphql" for the apollo interface where you can manually test queries/mutations
10. `yarn db:seed` to seed the database.

Logging

Default setting is 'none'. By chaning the LOG_LEVEL environment variable to info basic logging for the most important tasks is provided. By chaningn to debug sql queries are logged too.

### Client

1. Ensure the dev server is on
2. `cd client`
3. Add a `.env.local` file to the root of /clinet, all the environment variables will be sent to you by one of the teammates over a private Slack message.
4. `yarn codegen:generate`
5. `yarn next:dev` to run the file watcher. front end should be accessible at localhost:3000
   NOTE: when you change front end queries or mutations to the backend you need to manually run step 1 again.

## Api Tests

1. Important: Dev Server needs to be stopped.
2. `yarn test:api` to start the test

## Frontend/ E2E - Tests

Frontend and end-to-end test are currently developed in the branch "frontend-tests" and will be merged to master shortly.

`yarn cy:run` to run the tests

### Foodle's Architecture

![foodleArchitecture2](https://user-images.githubusercontent.com/50741293/166102503-4a02de06-00fa-47cc-bfe5-9df26d90c1cf.png)

### Repository Structure

- This repository has a monolithic architecture
- The web pages can be found /pages and the reusable components for these pages under /components
- Global SCSS styles can be found under /styles
- The Prisma schema and migrations made from it can be found under /prisma
- The Nexus Generated GraphQL schema can be found under server/generated/schema.graphql
- Code Definitons for GraphQL queries, mutations and types can be found under server/graphql/types
- Authentication relevant functions can be found under server/passport.ts as well as server/index.ts and utils/forgeJWT
- AWS-SDK: Currently AWS S3 CRUD functions for images are in the pages/api and are being called in the Step4 (and related) components of the Create A Listing flow. (this currently resides in the feat/s3 branch)

### Server Architecture

![foodleServerArchitecture3](https://user-images.githubusercontent.com/50741293/166102585-1762387a-5664-44c0-a464-1e37415e066e.png)

### Server Tech Stack

- Prisma: An Object-Relational Mapper that migrates changes to its schema to an SQL schema on command.
- NexusJS: A schema generator for GraphQL APIs. It provides type definitions for the GraphQL schema using the Code-First approach. On top it offers a prisma plugin that provides two APIs to integrate prisma into nexus. One API to project fields from models defined in the prisma schema into the GraphQL API. And a second API to build GraphQL root fields that allow the client to query and mutate data directly on the PostgreSQL database.
- Apollo-Express Server: A GraphQL Server handling CRUD operations called from the frontend. In addition, this server can handle REST requests to handle our Google OAuth authentication process that goes through PassportJS middleware.

### Client Tech Stack

- Next.Js + React.Js: ReactJs and the framework Next.Js built on top of it are used for routing, state management, server-side-rendering, CRUD requests from the Next API to our AWS S3 bucket, and much more.
- GraphQL CodeGen: Uses raw GraphQL queries to generates types (for our TypeScript code definitions) and react hooks to query our Server.
- Apollo Client: Also used to query our Server (but will be removed soon since it does not offer the same type safety as Codegen hooks)
- SCSS Modules: For component level styles
- 7-1 SCSS Architecture: For global styles and utility classes

### Deployment

The client is currently as a next.js application deployed on vercel. The backend is deployed on heroku and the postgreSQL database is deployed to render.
A continuous integration pipeline on the master branch is implemented with vercel. On every new pull request vercel provides a deployed preview for testing before merching to master.

### API Design

Schema first approach with nexus
Nexus enables to write both the schema and resolver logic in the same spot, using TypeScript. The graphql schema is then programatically generated based on the types defiend using nexus. This apprach comes with some benefits opposed to the schema-first approach:

- Resolver logic and type definitions are not only in one place but also written in the same language. As the schema is autogenerated we don't have to switch all the time between SDL and typeScript.
- More flexibility during development as the schema still grows in complexity and size.

![FoodleAPIDesign](https://github.com/FoodleBerlin/foodle/blob/aec33ced192ddbffd9a11cde2dcae1b54b6add51/FoodleAPIDesign.png)

### DB-Schema

The prisma schema file is the main configuration file for the prisma configuration. It holds the following configurations:

- Data sources: We defined a PostgreSQL datasource.
- Generators: When running prisma generate a typesafe Prisma JavaScript Client (typesafe ORM) is generated.
- Data model definitions

The following design decisions have been taken:

- When a listing is created, a property and a propertySlot gets saved to the db. For every concrete date of a propertySlot a concrete DaySlot is created and saved.
- Is a daySlot is not (yet) related to a specific booking, the daySlot is still available. Once the bookingId of a daySlot is set, the DaySlot is no longer available.
- We allow for users to make a booking on only a part of a daySlot. Therefore when creating a booking and saving the bookingId to a daySlot, the booked time also needs to be set, in order to retrace the price of the booking.

![FoodleDBSchema](https://github.com/FoodleBerlin/foodle/blob/master/FoodleDBSchema.png)

### Authentication

Currently we have authentication done through Google's OAuth process, facilitated by PassportJS and some ExpressJS routes.
![Foodle Authentication](https://user-images.githubusercontent.com/50741293/165271388-52ce8c88-a135-4561-9673-3e20ca5fd0fd.png)
<br>
This flow looks roughly as above (from [The Net Ninja](https://www.youtube.com/watch?v=nK6fkNShhGc&ab_channel=TheNetNinja)), except that we have a PostgreSQL database instead of a MongoDB NoSQL database. Any protected NextJS route checks for a valid JWT cookie and redirects users to the home page if they are not authenticated.

### Threat Model (Alex)

![FoodleThreatModel](https://user-images.githubusercontent.com/50741293/166244358-31aa031f-1634-44c8-97ac-9adbcbb97e54.jpg)
Foodle's Security Protections:

- Google OAuth login with PassportJs
- Input Validation in Backend Requests
- Check for JWT on several Next.Js pages
- Security Policy for AWS S3 bucket
- Added CSP for NextJS, ExpressJS
- Added Security Headers to NextJS and Express
- Made cookies enfore Https and Samesite-strict
- Turned off introspection for Apollo Server in production and added csrfPrevention and a CORS config to it
