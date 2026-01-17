# =========================
# Stage 1 — Dependencies
# =========================
FROM node:22-alpine AS deps

WORKDIR /app

# Copier uniquement les fichiers nécessaires à l'installation
COPY package*.json ./

# Installer uniquement les dépendances de production
RUN npm ci --omit=dev


# =========================
# Stage 2 — Runtime
# =========================
FROM node:22-alpine AS runtime

WORKDIR /app

# Variables d'environnement de base
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8010

# Création d’un utilisateur non-root
RUN addgroup -S appuser && adduser -S appuser -G appuser

# Copier les dépendances depuis le stage deps
COPY --from=deps /app/node_modules ./node_modules

# Code applicatif
COPY package*.json ./
COPY Authentification ./Authentification
COPY Controller ./Controller
COPY model ./model
COPY routes ./routes
COPY functions.js ./functions.js
COPY server.js ./server.js

# Permissions
RUN chown -R appuser:appuser /app
USER appuser

# Port exposé (informatif)
EXPOSE 8010

# Healthcheck (nécessite une route GET /health)
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||8010)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# Lancement du serveur
CMD ["node", "server.js"]
