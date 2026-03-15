# syntax=docker/dockerfile:1.6

FROM node:22-alpine AS base
WORKDIR /app

RUN apk add --no-cache openssl
COPY package.json package-lock.json ./
RUN npm install

FROM base AS builder
WORKDIR /app
COPY . .

COPY prisma/schema.prisma /app/prisma/schema.prisma
COPY next.config.ts ./

RUN --mount=type=secret,id=envfile,target=/app/.env \
    npx prisma generate && npm run build

# Remove .env files from build output for security
RUN rm -f /app/.env \
 && find /app/.next/standalone -maxdepth 2 -type f \( -name ".env" -o -name ".env.*" \) -delete || true

FROM node:22-alpine AS runner
WORKDIR /app

RUN apk add --no-cache openssl

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

COPY --from=builder /app/prisma/schema.prisma ./prisma/schema.prisma
COPY --from=builder /app/prisma/migrations ./prisma/migrations
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/src/generated ./src/generated

RUN npm init -y \
 && npm install --save-dev prisma

COPY scripts/run.sh /app/run.sh
RUN chmod +x /app/run.sh

ENV NODE_ENV=production
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["./run.sh"]
