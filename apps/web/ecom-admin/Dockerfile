# Stage 1: base
FROM node:lts-bookworm-slim AS base
WORKDIR /app
# Copy root metadata
COPY ./out/full/ .
COPY ./out/json .

# Stage 2: build
FROM base AS build
WORKDIR /app
# Install pnpm and turbo
RUN npm install -g pnpm turbo
# Install dependencies
RUN pnpm install --frozen-lockfile
RUN turbo  build

# # Stage 3: production nginx server
FROM nginx:alpine

# install node for runtime script
RUN apk add --no-cache nodejs

# copy frontend
COPY --from=build /app/apps/web/ecom-admin/dist /usr/share/nginx/html

# copy generator script
COPY --from=build /app/apps/web/ecom-admin/scripts/generate-env.js ./scripts/generate-env.js
COPY --from=build /app/apps/web/ecom-admin/scripts/index.sh ./docker-entrypoint.d/10-generate-env.sh

# auto-run script on container start
RUN chmod +x /docker-entrypoint.d/10-generate-env.sh
