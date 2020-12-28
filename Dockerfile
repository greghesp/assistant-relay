FROM node:12
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci && npm i -g pm2 && npm cache clean --force
COPY . .

EXPOSE 3000
CMD ["npm", "run", "start"]
