# Build Stage
FROM node:18-alpine as builder

WORKDIR /app

# Package files kopieren für besseres Caching
COPY package*.json ./

# Alle Dependencies installieren (inkl. devDependencies für Build)
RUN npm install

# Quellcode kopieren
COPY . .

# Build ausführen
RUN npm run build

# Production Stage
FROM nginx:alpine

# Built files aus dem Builder-Stage kopieren
COPY --from=builder /app/dist /usr/share/nginx/html

# Port freigeben
EXPOSE 80

# Nginx starten
CMD ["nginx", "-g", "daemon off;"]