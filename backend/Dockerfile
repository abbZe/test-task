FROM node:22.6.0-slim

RUN ["apt-get", "update", "-y"]
RUN ["apt-get", "install", "-y", "openssl"]
RUN ["apt-get", "install", "-y", "vim"]

RUN mkdir /backend
WORKDIR /backend

COPY ./package*.json ./
RUN npm install
COPY ./ ./
RUN npx prisma generate

CMD ["npm", "run", "start:dev"]