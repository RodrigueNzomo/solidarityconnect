📌 README pour le Backend (Node.js + Express.js)
📂 Backend - SolidarityConnect
Ce répertoire contient l'API backend de SolidarityConnect, développée avec Node.js, Express.js, et MySQL.

🏗 Installation et Configuration
1️⃣ Prérequis
Assurez-vous d'avoir installé :

Node.js 18+
MySQL 5.7+
Docker (optionnel)
2️⃣ Cloner le projet
bash
Copier
Modifier
git clone https://github.com/RodrigueNzomo/solidarityconnect.git
cd solidarityconnect/backend-solidarityconnect
3️⃣ Configurer l’environnement
Créer un fichier .env :

env
Copier
Modifier
DB_HOST=db
DB_USER=rooter
DB_PASSWORD=Local123!
DB_NAME=solidarityconnect
JWT_SECRET=my_secret_key
PORT=5000
4️⃣ Installer les dépendances
bash
Copier
Modifier
npm install
🚀 Démarrer l'API
En mode développement
bash
Copier
Modifier
npm run dev
L’API est accessible à : http://localhost:5000/api

En mode production
bash
Copier
Modifier
npm start
📜 Routes Principales
Méthode	Endpoint	Description
POST	/api/auth/register	Inscription utilisateur
POST	/api/auth/login	Connexion utilisateur
GET	/api/users	Liste des utilisateurs
GET	/api/requests	Voir les demandes d'aide
POST	/api/requests	Publier une demande
PUT	/api/requests/:id	Modifier une demande
DELETE	/api/requests/:id	Supprimer une demande
🛠 Tests
bash
Copier
Modifier
npm test
🐳 Utilisation avec Docker
bash
Copier
Modifier
docker build -t solidarityconnect_backend .
docker run -d --name backend_container -p 5000:5000 solidarityconnect_backend
📌 Contribuer
Pour contribuer :

Fork le repo
Crée une branche (git checkout -b feature/ma-feature)
Ajoute tes modifications
Fais un commit (git commit -m "Ajout de ma feature")
Pousse tes modifications (git push origin feature/ma-feature)
Crée une pull request
📧 Contact : r.nzomo.tmrcomputing@gmail.com

🚀 Merci de contribuer au développement du backend de SolidarityConnect !