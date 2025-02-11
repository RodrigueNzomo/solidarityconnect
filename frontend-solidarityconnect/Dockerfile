# Étape 1 : Construction du frontend Angular
FROM node:18 AS build
# Utilisation de Node.js 18 pour la phase de construction.
# Alternative : Vous pouvez utiliser une version plus récente de Node.js si nécessaire.

WORKDIR /usr/src/app
# Définition du répertoire de travail dans le conteneur.
# Alternative : Il est possible de changer ce répertoire selon la structure du projet, 
# mais `/usr/src/app` est une convention standard pour les builds.

# Copie uniquement les fichiers package.json et package-lock.json pour optimiser le cache Docker
COPY package*.json ./
# Explication : En copiant uniquement ces fichiers en premier, Docker peut utiliser le cache 
# lors de l’installation des dépendances si ceux-ci n’ont pas changé.
# Alternative : Pour éviter l'installation des devDependencies en production, utilisez 
# `--omit=dev`, ce qui réduit la taille de l'image.

RUN npm install --omit=dev && rm -rf /tmp/*
# Installation des dépendances et suppression des fichiers temporaires.
# Alternative : Si votre projet utilise `yarn`, remplacez `npm install` par `yarn install --production`.

# Copie du code source Angular
COPY . . 
# Explication : Copie tous les fichiers du projet dans le conteneur.
# Alternative : Vous pouvez exclure certains fichiers en définissant un `.dockerignore`.

ARG BUILD_MODE=production
# Variable d'argument pour choisir le mode de build.
# Alternative : Il est possible d'ajouter un mode `staging` ou `development` si vous gérez plusieurs environnements.

RUN npm run build --configuration=production --output-hashing=none && rm -rf node_modules

# Compilation Angular et suppression des node_modules après build pour réduire la taille de l’image finale.
# Alternative : Si vous ne voulez pas supprimer `node_modules`, modifiez la ligne pour les garder.

# Étape 2 : Déploiement du frontend avec Nginx
FROM nginx:alpine
# Utilisation de Nginx pour servir l'application.
# Alternative : Si vous préférez Apache, utilisez `FROM httpd:alpine`.

COPY --from=build /usr/src/app/dist/frontend-solidarityconnect/browser /usr/share/nginx/html
# Copie des fichiers Angular générés vers le dossier de Nginx.
# Alternative : Pour un environnement Docker Swarm ou Kubernetes, servez les fichiers via un volume partagé.

# Correction du chemin pour `nginx.conf`
COPY nginx.conf /etc/nginx/nginx.conf
# Explication : Utilisation d'un fichier de configuration personnalisé pour Nginx.
# Alternative : Vous pouvez également modifier la configuration directement dans le `Dockerfile` en utilisant `echo`.

RUN rm -rf /tmp/* /var/cache/apk/*
# Nettoyage des fichiers inutiles pour réduire la taille de l'image finale.
# Alternative : Vous pouvez utiliser `multi-stage builds` pour éviter d'inclure des fichiers temporaires dès le départ.

EXPOSE 80
# Expose le port 80 pour que Nginx puisse recevoir les requêtes HTTP.
# Alternative : Pour HTTPS, exposez également le port 443 (`EXPOSE 80 443`).

CMD ["nginx", "-g", "daemon off;"]
# Démarrage de Nginx en mode non-démon.
# Alternative : Si vous souhaitez exécuter d'autres commandes avant le démarrage de Nginx, 
# créez un script `entrypoint.sh` et appelez-le ici.

