# Build-Stage
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production-Stage ohne NGINX
FROM node:18-alpine

WORKDIR /app

# Nur das Build kopieren
COPY --from=builder /app/build ./build

# Static Server installieren
RUN npm install -g serve

# Port 3000 freigeben
EXPOSE 3000

# React-Build mit "serve" auf Port 3000 starten
CMD ["serve", "-s", "build", "-l", "3000"]
