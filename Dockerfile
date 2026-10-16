# Etapa 1: build de Next.js (standalone)
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa 2: servidor Node
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# Migraciones SQL (se aplican al arrancar, ver instrumentation.ts)
COPY --from=builder /app/drizzle ./drizzle
# Libro (fuera de public/: solo lo entrega /api/ebook/libro con código válido)
COPY --from=builder /app/private ./private

USER node
EXPOSE 3000

CMD ["node", "server.js"]
