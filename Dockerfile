FROM node:12-alpine
RUN  apk update
WORKDIR /notification/app

COPY package*.json ./
RUN  npm install

COPY . .

EXPOSE 3030

CMD ["npm", "start"]