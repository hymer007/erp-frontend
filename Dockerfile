FROM node:18-alpine

# Arbeitsverzeichnis setzen
WORKDIR /app

# Package files kopieren
COPY package.json ./

# Dependencies installieren (ohne cache clearing)
RUN npm install

# Source code kopieren
COPY . .

# App bauen
RUN npm run build

# Port freigeben
EXPOSE 3000

# Preview server starten
CMD ["npm", "run", "preview"]