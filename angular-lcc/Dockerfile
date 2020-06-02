FROM node:13.12.0-alpine as angular-lcc
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build --prod

FROM nginx:alpine AS webserver
VOLUME /var/cache/nginx
COPY --from=angular-lcc app/dist/angular-lcc/ usr/share/nginx/html
