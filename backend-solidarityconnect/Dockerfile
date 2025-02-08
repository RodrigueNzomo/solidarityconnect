# Utilisation de Node.js 16 comme base
FROM node:16 AS build
# Explication : Cette ligne utilise l'image officielle Node.js 16 comme base pour le conteneur.
# Alternative : Si vous avez besoin d'une version plus récente ou plus légère, envisagez d'utiliser `node:18-alpine` pour réduire la taille de l'image.

# Définir le répertoire de travail correct
WORKDIR /usr/src/app
# Explication : Définit le répertoire de travail dans le conteneur. Toutes les commandes suivantes seront exécutées à partir de ce répertoire.
# Alternative : Vous pouvez choisir un autre chemin si nécessaire, mais `/usr/src/app` est une convention courante.

# Copier uniquement les fichiers nécessaires pour l'installation des dépendances
COPY package*.json ./
# Explication : Copie uniquement les fichiers `package.json` et `package-lock.json` dans le conteneur pour minimiser le nombre de couches et améliorer la mise en cache.
# Alternative : Si vous utilisez Yarn, copiez également `yarn.lock` : `COPY package.json yarn.lock ./`.

# Installer les dépendances de production
RUN apt-get update && apt-get install -y netcat && rm -rf /var/lib/apt/lists/*
# Explication : Met à jour les paquets APT, installe `netcat` (outil réseau), puis nettoie les fichiers inutiles pour réduire la taille de l'image.
# Alternative : Pour une image plus légère, évitez d'utiliser `apt-get` et intégrez les outils nécessaires via des images de base comme `alpine`.

RUN NODE_ENV=production npm install --only=production
# Explication : Installe uniquement les dépendances de production en définissant `NODE_ENV=production` pour optimiser la taille du conteneur.
# Alternative : Utilisez `--omit=dev` à la place de `--only=production` pour obtenir le même résultat avec une syntaxe plus moderne.

# Copier tout le projet dans le conteneur
COPY . .
# Explication : Copie tous les fichiers du projet dans le conteneur. Cela inclut le code source et d'autres ressources nécessaires.
# Alternative : Si certaines parties du projet ne sont pas nécessaires au runtime, utilisez un `.dockerignore` pour exclure ces fichiers.

# Donner les permissions au script wait-for-it.sh s'il existe
RUN chmod +x /usr/src/app/wait-for-it.sh
# Explication : Rend le script `wait-for-it.sh` exécutable pour permettre l'attente du service de base de données avant de démarrer l'application.
# Alternative : Intégrez directement une solution native Node.js pour gérer la détection de la disponibilité du service (par exemple, avec une bibliothèque comme `mysql-ping`).

# Exposer le port 5000
EXPOSE 5000
# Explication : Indique que le conteneur écoute sur le port 5000. Cela ne publie pas automatiquement le port, mais documente son utilisation.
# Alternative : Si votre application peut fonctionner sur un autre port, ajustez cette valeur en conséquence.

# Lancer l'application avec app.js qui est à la racine
CMD ["/usr/src/app/wait-for-it.sh", "db:3306", "--", "node", "app.js"]
# Explication : Lance le script `wait-for-it.sh` pour attendre que la base de données soit prête, puis démarre l'application Node.js avec `app.js`.
# Alternative : Considérez l'utilisation d'un gestionnaire de processus comme `pm2` pour une meilleure gestion des processus et de la récupération après crash :
# CMD ["pm2", "start", "app.js", "--no-daemon"]
