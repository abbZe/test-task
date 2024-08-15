FROM node:22.6.0-slim

RUN ["apt-get", "update", "-y"]
RUN ["apt-get", "install", "-y", "openssl"]
RUN ["apt-get", "install", "-y", "vim"]

RUN mkdir /frontend
WORKDIR /frontend

COPY ./package*.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "run", "start:dev"]