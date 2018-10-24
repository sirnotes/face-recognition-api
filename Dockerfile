FROM node:carbon

RUN mkdir -p /usr/src/face-recognition-api
WORKDIR /usr/src/face-recognition-api

COPY package.json /usr/src/face-recognition-api
RUN npm install

COPY . /usr/src/face-recognition-api