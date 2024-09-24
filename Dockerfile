FROM node:22-alpine AS construir

WORKDIR /app

COPY . .

RUN npm i

RUN npm run build

FROM nginx:alpine AS prod

COPY --from=construir /app/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 443