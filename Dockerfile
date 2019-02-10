FROM node:8.15

COPY . /app
WORKDIR /app
RUN npm install
RUN npm build

EXPOSE 8080
CMD npm run serve
