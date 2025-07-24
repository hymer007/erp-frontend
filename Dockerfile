# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Build-Tools installieren
RUN apk add --no-cache python3 make g++

# Abhängigkeiten installieren
COPY package*.json ./
RUN npm install

# Projektdateien kopieren
COPY . .

# Debug: Inhalt prüfen
# RUN ls -R .

# Build ausführen
RUN npm run build

# Stage 2: Serve-Container
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
WORKDIR /app/dist
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]