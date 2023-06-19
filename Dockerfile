FROM node:lts-bullseye as building
WORKDIR /app
COPY package*.json ./
RUN npm i --force
COPY . .
RUN npm run build

FROM nginx:alpine as Deployment
ADD ./config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=building /app/dist/pokemon /var/www/app/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]