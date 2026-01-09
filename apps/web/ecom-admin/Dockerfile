# Stage 1: base
FROM node:lts-bookworm-slim AS dep
WORKDIR /app
# Copy root metadata
COPY ./json/ .
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Stage 2: build
FROM dep AS build
ARG TURBO_TOKEN
ENV TURBO_TOKEN=${TURBO_TOKEN}

ARG TURBO_TEAM
ENV TURBO_TEAM=${TURBO_TEAM}
WORKDIR /app
COPY ./full/ .
RUN pnpm build

# # Stage 3: production nginx server
FROM nginx:alpine

# install node for runtime script
RUN apk add --no-cache nodejs

# copy frontend
COPY --from=build /app/apps/web/ecom-admin/dist /usr/share/nginx/html

# copy generator script
COPY --from=build /app/apps/packages/scripts/tools/index.js ./scripts/index.js
COPY --from=build /app/apps/web/ecom-admin/scripts/index.sh ./docker-entrypoint.d/10-generate-env.sh

# auto-run script on container start
RUN chmod +x /docker-entrypoint.d/10-generate-env.sh
