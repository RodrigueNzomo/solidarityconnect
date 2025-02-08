# Dockerfile optimisé pour le frontend

# Étape 1 : Construction du frontend
FROM node:18 AS build 
# Explication : Utilisation de Node.js 18 comme base pour la phase de construction.
# Alternative : Si vous voulez réduire la taille de l'image de build, considérez `node:18-alpine`, mais assurez-vous que toutes les dépendances sont compatibles.

WORKDIR /usr/src/app
# Explication : Définit le répertoire de travail dans le conteneur. Toutes les commandes suivantes seront exécutées à partir de ce répertoire.
# Alternative : Aucune alternative significative ici, car `/usr/src/app` est une convention courante.

COPY package*.json ./
# Explication : Copie uniquement les fichiers `package.json` et `package-lock.json` nécessaires pour installer les dépendances.
# Alternative : Si vous utilisez Yarn, copiez également `yarn.lock` : `COPY package.json yarn.lock ./`.

RUN npm install && rm -rf /tmp/*
# Explication : Installe toutes les dépendances (y compris celles de développement) et nettoie les fichiers temporaires pour minimiser la taille de l'image intermédiaire.
# Alternative : Pour éviter les doublons lors de la mise en cache, séparez les étapes :
# RUN npm ci --production=false && rm -rf /tmp/*

COPY . .
# Explication : Copie tous les fichiers du projet dans le conteneur pour la phase de construction.
# Alternative : Ajoutez un `.dockerignore` pour exclure les fichiers inutiles au build (par exemple, `.git`, `node_modules`, etc.).

ARG BUILD_MODE=production
# Explication : Définit une variable d'argument (`BUILD_MODE`) qui peut être passée lors de la construction de l'image. Par défaut, elle est définie sur "production".
# Alternative : Vous pouvez passer cette variable directement lors de la commande `docker build` si vous préférez ne pas l'inclure dans le Dockerfile.

RUN npm run build --${BUILD_MODE} && rm -rf node_modules
# Explication : Exécute la commande de build en fonction du mode spécifié (par défaut "production") et supprime ensuite les dépendances pour réduire la taille de l'image intermédiaire.
# Alternative : Si vous utilisez une CI/CD, envisagez de configurer les variables d'environnement directement dans votre pipeline pour plus de flexibilité.

# Étape 2 : Configuration du serveur Nginx
FROM nginx:alpine
# Explication : Utilise une image Alpine légère de Nginx pour servir les fichiers statiques générés.
# Alternative : Si vous avez besoin de fonctionnalités supplémentaires ou de sécurité renforcée, utilisez une image non-Alpine de Nginx, mais cela augmentera la taille de l'image.

COPY --from=build /usr/src/app/dist/frontend-solidarityconnect /usr/share/nginx/html
# Explication : Copie les fichiers statiques générés lors de la phase de construction vers le répertoire par défaut de Nginx.
# Alternative : Si votre structure de répertoires change, ajustez le chemin source ou cible en conséquence.

COPY nginx.conf /etc/nginx/nginx.conf
# Explication : Remplace la configuration par défaut de Nginx par une configuration personnalisée fournie dans `nginx.conf`.
# Alternative : Si vous n'avez pas besoin de personnalisation, vous pouvez omettre cette étape et utiliser la configuration par défaut.

RUN rm -rf /tmp/* /var/cache/apk/*
# Explication : Nettoie les fichiers temporaires et le cache d'Alpine pour minimiser la taille finale de l'image.
# Alternative : Cette étape est déjà optimale pour une image Alpine. Pour d'autres bases, adaptez les chemins de nettoyage.

EXPOSE 80
# Explication : Indique que le conteneur écoute sur le port 80. Cela ne publie pas automatiquement le port, mais documente son utilisation.
# Alternative : Si votre application sert sur un autre port (par exemple, 8080), ajustez cette valeur en conséquence.
