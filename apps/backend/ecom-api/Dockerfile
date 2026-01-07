# Stage 1: deps
FROM node:lts-bookworm-slim AS deps
WORKDIR /app

# Copy only package metadata to install deps
COPY ./json . 
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Stage 2: builder
FROM deps AS builder
ARG TURBO_TEAM
ENV TURBO_TEAM=$TURBO_TEAM

ARG TURBO_TOKEN
ENV TURBO_TOKEN=$TURBO_TOKEN

WORKDIR /app
COPY ./full .
RUN apt-get update -y && apt-get install -y openssl
RUN pnpm build
RUN pnpm deploy --filter @backend/ecom ./final --prod 

# Stage 3: runner
FROM node:lts-bookworm-slim AS runner
WORKDIR /app
RUN apt-get update -y && apt-get install -y curl
COPY --from=builder /app/final/dist ./dist
COPY  --from=builder /app/final/package.json ./package.json
COPY --from=builder /app/final/node_modules ./node_modules
RUN npm install -g pnpm
EXPOSE 3000
CMD ["pnpm","start"]
