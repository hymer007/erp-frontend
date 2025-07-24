# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# Quellcode kopieren und bauen
COPY . .
RUN npm run build

# Stage 2: Serve-Server
FROM node:18-alpine
WORKDIR /app

# Globale Installation von serve
RUN npm install -g serve

# Build-Artefakte kopieren
COPY --from=builder /app/dist ./dist

# Arbeitsverzeichnis auf dist setzen
WORKDIR /app/dist

# Port freigeben
EXPOSE 3000

# Statische Dateien ausliefern auf Port 3000
CMD ["serve", "-s", ".", "-l", "3000"]