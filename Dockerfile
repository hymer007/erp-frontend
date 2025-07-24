FROM node:18-alpine

# Arbeitsverzeichnis setzen
WORKDIR /app

# Package files kopieren
COPY package.json ./

# Dependencies installieren
RUN npm install

# Config files kopieren
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# HTML file kopieren
COPY index.html ./

# Source code kopieren
COPY src/ ./src/

# Public ordner erstellen (falls nicht vorhanden)
RUN mkdir -p public

# Debugging: Struktur anzeigen
RUN ls -la && ls -la src/

# App bauen
RUN npm run build

# Port freigeben
EXPOSE 3000

# Preview server starten
CMD ["npm", "run", "preview"]
