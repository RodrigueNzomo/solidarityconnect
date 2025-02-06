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
ARG BUILD_MODE=production
RUN npm run build --${BUILD_MODE} && rm -rf node_modules

# Étape 7 : Utiliser Nginx pour servir l'application construite
FROM nginx:alpine
# Étape 8 : Copier les fichiers construits dans le répertoire de Nginx
COPY --from=build /usr/src/app/dist/frontend-solidarityconnect /usr/share/nginx/html
# Étape 9 : Copier la configuration Nginx personnalisée (facultatif)
COPY nginx.conf /etc/nginx/nginx.conf
# Étape 10 : Nettoyer les fichiers temporaires
RUN rm -rf /tmp/* /var/cache/apk/*
# Étape 11 : Exposer le port 80
EXPOSE 80