FROM node:16
EXPOSE 5000
RUN apt-get update && apt-get install -y apt-transport-https ca-certificates curl gnupg && \
    curl -sLf --retry 3 --tlsv1.2 --proto "=https" 'https://packages.doppler.com/public/cli/gpg.DE2A7741A397C129.key' | apt-key add - && \
    echo "deb https://packages.doppler.com/public/cli/deb/debian any-version main" | tee /etc/apt/sources.list.d/doppler-cli.list && \
    apt-get update && \
    apt-get -y install doppler

#setup yarn 
RUN npm i -g corepack
RUN corepack prepare yarn@1.22.19 --activate
WORKDIR /
COPY ./ ./server
WORKDIR /server
RUN yarn
RUN yarn prisma:generate
RUN yarn tsc --build
CMD [ "doppler", "run", "--","node", "build/index.js" ]