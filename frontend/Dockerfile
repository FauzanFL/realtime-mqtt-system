FROM node:22.12.0-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 4100

CMD [ "npm", "start" ]