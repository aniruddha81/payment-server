FROM oven/bun:1.2.22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

COPY tsconfig.json ./
COPY src ./src

EXPOSE 8080

CMD ["bun", "run", "src/index.ts"]