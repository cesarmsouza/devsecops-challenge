const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (_req, res) => res.send('🚀 Demo App up & running! Use /health.'));
app.get('/health', (_req, res) => res.status(200).json({ status: 'ok', ts: new Date()_
cd ~/devsecops-challenge   # ajuste se for outro caminho

# Ver se o Dockerfile está ausente/truncado
git ls-files | grep -i '^Dockerfile$' || echo "SEM Dockerfile"
[ -f Dockerfile ] && wc -c Dockerfile

# Criar/forçar o Dockerfile correto na RAIZ
cat > Dockerfile <<'EOF'
FROM node:20-alpine AS build
WORKDIR /app
COPY app/package*.json ./
RUN npm ci --only=production
COPY app/ .
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app /app
EXPOSE 3000
CMD ["node","server.js"]
