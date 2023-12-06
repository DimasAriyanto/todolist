FROM node:20.9.0-alpine3.18

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3030

CMD ["npm", "start"]