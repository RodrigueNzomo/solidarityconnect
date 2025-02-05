# Étape 1 : Utiliser l'image Node.js pour construire l'application Angular
FROM node:18 AS build

# Étape 2 : Définir un répertoire de travail
WORKDIR /usr/src/app

# Étape 3 : Copier les fichiers de configuration npm
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier tout le reste du code source
COPY . .

# Étape 6 : Construire l'application Angular en mode production
RUN npm run build --prod

# Étape 7 : Utiliser Nginx pour servir l'application construite
FROM nginx:alpine

# Étape 8 : Copier les fichiers construits dans le répertoire de Nginx
COPY --from=build /usr/src/app/dist/frontend-solidarityconnect /usr/share/nginx/html

# Étape 9 : Exposer le port 80
EXPOSE 80