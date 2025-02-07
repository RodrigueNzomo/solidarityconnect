# Dockerfile optimisé pour le frontend
FROM node:18 AS build 
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install && rm -rf /tmp/*
COPY . .
ARG BUILD_MODE=production
RUN npm run build --${BUILD_MODE} && rm -rf node_modules

FROM nginx:alpine
COPY --from=build /usr/src/app/dist/frontend-solidarityconnect /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /tmp/* /var/cache/apk/*
EXPOSE 80
