FROM node:18-bullseye-slim

RUN mkdir /frontend

WORKDIR /frontend

COPY package*.json ./

RUN npm ci 

COPY . .

RUN npm run build

CMD ["npm", "start"]
