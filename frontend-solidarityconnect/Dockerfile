# Étape 1 : Construction du frontend Angular
FROM node:18 AS build
# Utilisation de Node.js 18 pour la phase de construction.

WORKDIR /usr/src/app
# Définition du répertoire de travail dans le conteneur.

# Copie uniquement les fichiers package.json et package-lock.json pour optimiser le cache Docker
COPY frontend-solidarityconnect/package*.json ./

RUN npm install --omit=dev && rm -rf /tmp/*
# Installation des dépendances et suppression des fichiers temporaires.

# Copie du code source Angular
COPY frontend-solidarityconnect/ . 

ARG BUILD_MODE=production
# Variable d'argument pour choisir le mode de build.

RUN npm run build --configuration=${BUILD_MODE} --output-hashing=none && rm -rf node_modules
# Compilation Angular et suppression des node_modules après build.

# Étape 2 : Déploiement du frontend avec Nginx
FROM nginx:alpine
# Utilisation de Nginx pour servir l'application.

COPY --from=build /usr/src/app/dist/frontend-solidarityconnect/browser /usr/share/nginx/html
# Copie des fichiers Angular générés vers le dossier de Nginx.

# Correction du chemin pour `nginx.conf`
COPY nginx.conf /etc/nginx/nginx.conf

# Ajout de la configuration personnalisée de Nginx.

RUN rm -rf /tmp/* /var/cache/apk/*
# Nettoyage des fichiers inutiles.

EXPOSE 80
# Expose le port 80 pour Nginx.

CMD ["nginx", "-g", "daemon off;"]
# Démarrage de Nginx en mode non-démon.
