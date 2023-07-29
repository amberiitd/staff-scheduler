FROM node:14

WORKDIR /root

COPY /js ./js
COPY package.json package-lock.json .env swagger.yml ./

RUN npm install

EXPOSE 8080

ENTRYPOINT ["npm", "start"]