# Étape 1 : Utiliser l'image officielle Node.js comme base
FROM node:16 AS build

# Étape 2 : Définir un répertoire de travail
WORKDIR /usr/src/app

# Étape 3 : Copier les fichiers de configuration npm avant d'installer les dépendances
COPY package*.json ./

# Étape 4 : Installer uniquement les dépendances de production (si applicable)
RUN npm install --only=production

# Étape 5 : Copier uniquement les fichiers nécessaires
COPY . .

# Étape 6 : Donner les permissions d'exécution au script d'attente pour la base de données
RUN chmod +x /usr/src/app/wait-for-it.sh

# Étape 7 : Exposer le port utilisé par l'application
EXPOSE 5000

# Étape 8 : Définir l'entrée du conteneur
CMD ["/usr/src/app/wait-for-it.sh", "db:3306", "--", "npm", "start"]
