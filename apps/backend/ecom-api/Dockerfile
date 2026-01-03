# Stage 1: base
FROM node:lts-bookworm-slim AS base
WORKDIR /app

# Copy root metadata
COPY ./out/full/ .
COPY ./out/json/ .

# Stage 2: build
FROM base AS build
WORKDIR /app
# Install pnpm and turbo
RUN npm install -g pnpm turbo
# Install dependencies
RUN pnpm install --frozen-lockfile
RUN turbo  build


EXPOSE 3000
CMD [ "pnpm", "--filter=@backend/ecom", "start" ]
