# Build Stage
FROM node:22.8.0 AS build

WORKDIR /app
COPY . ./

RUN yarn install
RUN yarn build

# Serve the app with Nginx in a production environment
FROM nginx:1.27.3-alpine

COPY --from=build /app/dist /usr/share/nginx/html
