FROM node:14

WORKDIR /js

COPY /js ./js
COPY package.json package-lock.json .env ./

RUN npm install

EXPOSE 8080

ENTRYPOINT ["npm", "start"]