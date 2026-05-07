# ── Stage 1 : builder ─────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances en premier (cache Docker layer)
COPY package*.json ./
COPY prisma ./prisma/

# Installer toutes les dépendances (y compris devDependencies pour prisma generate)
RUN npm ci

# Générer le client Prisma
RUN npx prisma generate

# ── Stage 2 : production ───────────────────────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

# Copier les dépendances de production depuis le builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Copier le code source
COPY src ./src
COPY package*.json ./

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Exposer le port de l'application
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

# Démarrer l'application
CMD ["node", "src/server.js"]
