FROM node:18-alpine

# Arbeitsverzeichnis setzen
WORKDIR /app

# System-Updates und dependencies
RUN apk add --no-cache git

# NPM cache leeren und neueste npm version
RUN npm cache clean --force && npm install -g npm@latest

# Package files kopieren
COPY package*.json ./

# Dependencies installieren mit verbose logging
RUN npm ci --verbose --no-audit --no-fund

# Source code kopieren
COPY . .

# App bauen
RUN npm run build

# Port freigeben
EXPOSE 3000

# Preview server starten (Vite's production server)
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]