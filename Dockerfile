FROM node:14.12.0-slim

WORKDIR /usr/app/windi-serve
COPY . .
RUN yarn

EXPOSE 3000
CMD yarn start