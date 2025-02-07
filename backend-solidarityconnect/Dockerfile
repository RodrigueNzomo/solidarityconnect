# Utilisation de Node.js 16 comme base
FROM node:16 AS build

# Définir le répertoire de travail correct
WORKDIR /usr/src/app

# Copier uniquement les fichiers nécessaires pour l'installation des dépendances
COPY package*.json ./

# Installer les dépendances de production
RUN apt-get update && apt-get install -y netcat && rm -rf /var/lib/apt/lists/*
RUN NODE_ENV=production npm install --only=production

# Copier tout le projet dans le conteneur
COPY . . 

# Donner les permissions au script wait-for-it.sh s'il existe
RUN chmod +x /usr/src/app/wait-for-it.sh

# Exposer le port 5000
EXPOSE 5000

# Lancer l'application avec app.js qui est à la racine
CMD ["/usr/src/app/wait-for-it.sh", "db:3306", "--", "node", "app.js"]
