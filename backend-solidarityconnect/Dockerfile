# Étape 1 : Utiliser l'image officielle Node.js comme base
FROM node:16

# Étape 2 : Définir un répertoire de travail
WORKDIR /usr/src/app

# Étape 3 : Copier les fichiers de configuration npm
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier le fichier wait-for-it.sh
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh

# Étape 6 : Donner les permissions d'exécution au script
RUN chmod +x /usr/src/app/wait-for-it.sh

# Étape 7 : Copier tout le reste du code
COPY . .

# Étape 8 : Exposer le port sur lequel l'application écoute
EXPOSE 5000

# Étape 9 : Commande pour démarrer l'application
ENTRYPOINT ["/usr/src/app/wait-for-it.sh", "db:3306", "--", "npm", "start"]