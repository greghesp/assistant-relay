FROM nikolaik/python-nodejs:latest

WORKDIR /assistant-relay

COPY ./relay/ .

RUN npm run setup && rm -rf bin/config.json

EXPOSE 3000

CMD npm run start