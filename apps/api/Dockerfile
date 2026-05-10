FROM node:20-alpine

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# Copy root workspace files
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/database/package.json ./packages/database/
COPY packages/types/package.json ./packages/types/

# Copy lockfile if it exists
COPY pnpm-lock.yaml* ./

RUN pnpm install

# Copy source code
COPY . .

# Build the API app
RUN pnpm turbo run build --filter=@brokencode/api

EXPOSE 3000

CMD ["pnpm", "--filter", "@brokencode/api", "run", "start:prod"]
