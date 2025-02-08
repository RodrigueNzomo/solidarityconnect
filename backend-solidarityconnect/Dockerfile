# Utilisation de Node.js 18 comme base
FROM node:18 AS build
# Explication : Utilisation de Node.js 18, version plus récente et stable que Node.js 16.
# Alternative : Si l'objectif est de minimiser la taille de l'image, utiliser `node:18-alpine` qui est plus légère.

# Définition du répertoire de travail
WORKDIR /app
# Explication : Définit le dossier de travail du conteneur où seront exécutées les commandes suivantes.
# Alternative : `/usr/src/app` est parfois utilisé par convention, mais `/app` est plus court et lisible.

# Définir l'environnement en production
ENV NODE_ENV=production
# Explication : Définit `NODE_ENV=production` globalement pour optimiser les performances et exclure les dépendances inutiles.
# Alternative : Si vous avez besoin d'exécuter des tests dans le conteneur, passez `NODE_ENV=development`.

# Copier uniquement les fichiers nécessaires pour l’installation des dépendances
COPY package*.json ./
# Explication : Seuls les fichiers `package.json` et `package-lock.json` sont copiés d’abord pour optimiser la mise en cache.
# Alternative : Si vous utilisez Yarn, ajoutez `yarn.lock` : `COPY package.json yarn.lock ./`.

# Installation des dépendances de production
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

# Explication : Met à jour les paquets et installe `netcat`, qui permet d'attendre que la base de données soit prête.
# Alternative : Évitez d'utiliser `apt-get` si ce n'est pas nécessaire, ou utilisez une image Alpine avec `apk add netcat`.

RUN npm install --omit=dev
# Explication : Installe uniquement les dépendances essentielles pour la production (`omit=dev` exclut les dépendances de développement).
# Alternative : `npm ci` peut être utilisé si vous voulez garantir une installation propre et rapide en production.

# Copier le reste du projet dans le conteneur
COPY . .
# Explication : Copie tout le code source dans l’image après installation des dépendances pour éviter de casser le cache Docker.
# Alternative : Utiliser un fichier `.dockerignore` pour exclure les fichiers inutiles (`node_modules`, `.git`, `.env`…).

# Donner les permissions au script wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh
# Explication : Rend le script exécutable pour attendre la base de données avant de lancer l’application.
# Alternative : Remplacer `wait-for-it.sh` par une logique native en Node.js pour une meilleure intégration.

# Exposer le port utilisé par l’application
EXPOSE 5000
# Explication : Indique que l’application écoute sur le port 5000.
# Alternative : Si l'application utilise un port configurable via une variable d’environnement, utilisez `$PORT`.

# Lancer l’application avec `wait-for-it.sh` pour attendre MySQL avant de démarrer Node.js
CMD ["/app/wait-for-it.sh", "db:3306", "--", "node", "app.js"]
# Explication : Exécute `wait-for-it.sh` pour s’assurer que la base de données est prête avant de lancer le backend.
# Alternative : Utiliser `pm2` pour gérer les processus et permettre le redémarrage automatique :
# CMD ["pm2-runtime", "app.js"]
