# Install dependencies only when needed
FROM node:lts-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Rebuild the source code only when needed
FROM node:lts-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Production image, copy all the files and run next
FROM node:lts-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json package-lock.json ./
COPY .env ./

EXPOSE 3000

CMD ["npm", "start"]


