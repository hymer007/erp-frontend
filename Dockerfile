FROM node:18-alpine

WORKDIR /app

# Package files kopieren
COPY package*.json ./

# Dependencies installieren
RUN npm ci

# Source code kopieren
COPY . .

# App bauen
RUN npm run build

# Port freigeben
EXPOSE 3000

# Preview server starten (Vite's production server)
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]