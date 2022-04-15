FROM node:16
WORKDIR /src/app
COPY package*.json ./
RUN yarn cache clean && yarn --update-checksums
COPY . ./
COPY .env.production /src/app/
RUN yarn install --frozen-lockfile
RUN yarn production:prisma:migrate:deploy
ENV NODE_ENV=production
EXPOSE 3000 5000
RUN yarn production:start:server
RUN yarn next:build && yarn next:start