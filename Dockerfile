FROM node:alpine as builder

WORKDIR /app

RUN apk add curl && \
curl -L https://github.com/greghesp/assistant-relay/releases/download/v3.0.5/release.zip --output assistant-relay.zip && \
unzip assistant-relay.zip && \
npm i pm2 && \
npm i

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start"]