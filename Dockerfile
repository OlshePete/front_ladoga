FROM node:18

WORKDIR /usr/app

COPY package*.json ./

RUN npm i

COPY . .

CMD ["npm", "run", "dev"]