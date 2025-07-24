FROM node:18-alpine

# Arbeitsverzeichnis setzen
WORKDIR /app

# Package files kopieren
COPY package.json ./

# Dependencies installieren
RUN npm install

# Source code kopieren (wichtig: richtige Reihenfolge)
COPY index.html ./
COPY src/ ./src/
COPY public/ ./public/
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Debugging: Struktur anzeigen
RUN ls -la && ls -la src/

# App bauen
RUN npm run build

# Port freigeben
EXPOSE 3000

# Preview server starten
CMD ["npm", "run", "preview"]