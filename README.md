# solidarityconnect
SolidarityConnect - Plateforme d'Entraide Communautaire
(Ajoute un logo ici si nécessaire)

📌 Description
SolidarityConnect est une plateforme web Full Stack visant à faciliter l'entraide entre les membres d'une communauté. Elle permet aux personnes en difficulté de publier des demandes d'aide et aux bénévoles de proposer leur assistance.

🔍 Fonctionnalités clés :
Inscription et authentification sécurisée (JWT)
Publication et gestion des demandes d'aide
Recherche avancée de bénévoles
Messagerie en temps réel
Système de feedback et d’évaluation
Interface utilisateur ergonomique et moderne
Sécurisation des données (chiffrement, validation, gestion des rôles)
🚀 Technologies Utilisées
Composant	Technologie
Frontend	Angular 17, TypeScript, SCSS
Backend	Node.js 18, Express.js, JWT, Sequelize
Base de données	MySQL 8.x
Conteneurisation	Docker, Docker Compose
Tests	Jasmine, Cypress
CI/CD	GitHub Actions
Gestion de projet	Scrum avec Jira
📁 Structure du Projet
graphql
Copier
Modifier
solidarityconnect/
│── backend-solidarityconnect/   # API REST avec Node.js et Express
│── frontend-solidarityconnect/  # Interface utilisateur avec Angular
│── docker-compose.yml           # Configuration Docker pour orchestrer les services
│── README.md                    # Documentation du projet
📦 Installation et Déploiement
1️⃣ Prérequis
Avant de commencer, assure-toi d'avoir installé :

Node.js 18+
Docker & Docker Compose
Git
2️⃣ Cloner le projet
bash
Copier
Modifier
git clone https://github.com/RodrigueNzomo/solidarityconnect.git
cd solidarityconnect
3️⃣ Configuration des variables d'environnement
Créer un fichier .env pour le backend :

env
Copier
Modifier
DB_HOST=db
DB_USER=rooter
DB_PASSWORD=Local123!
DB_NAME=solidarityconnect
JWT_SECRET=my_secret_key
🏗 Démarrer les services avec Docker
Démarrer tous les services
bash
Copier
Modifier
docker-compose up --build -d
Vérifier les services en cours d'exécution
bash
Copier
Modifier
docker ps
Consulter les logs
bash
Copier
Modifier
docker logs -f solidarityconnect_backend
docker logs -f solidarityconnect_frontend
⚙️ Développement et Test
Backend
Accéder au backend :

bash
Copier
Modifier
cd backend-solidarityconnect
npm install
npm run dev
Accéder à l’API : http://localhost:5000/api

Frontend
Accéder au frontend :

bash
Copier
Modifier
cd frontend-solidarityconnect
npm install
ng serve
Accéder à l’interface utilisateur : http://localhost:4200

📤 Déploiement sur Docker Hub
1️⃣ Se connecter à Docker Hub
bash
Copier
Modifier
docker login
2️⃣ Builder et tagger les images
bash
Copier
Modifier
docker tag solidarityconnect_backend dockerrodrigue/solidarityconnect_backend:latest
docker tag solidarityconnect_frontend dockerrodrigue/solidarityconnect_frontend:latest
3️⃣ Pousser les images vers Docker Hub
bash
Copier
Modifier
docker push dockerrodrigue/solidarityconnect_backend:latest
docker push dockerrodrigue/solidarityconnect_frontend:latest
📜 Documentation et Références
📌 Présentation complète du projet :

[Analyse et Conception UML](Projet Amis Solidaires_Partie Analyse et Conception Redigéé Par Rodrigue Nzomo.pptx)​
[Agilité et Développement](Projet Amis Solidaires_Partie Agilité et Developpement Redigéé Par Rodrigue Nzomo.pptx)​
📌 Dépôt GitHub :

🔗 Repository GitHub
Clonage SSH : git@github.com:RodrigueNzomo/solidarityconnect.git
Clonage rapide : gh repo clone RodrigueNzomo/solidarityconnect
📌 Contact : 📧 Email : r.nzomo.tmrcomputing@gmail.com

🛠 Contribuer au Projet
Nous encourageons les contributions open-source ! Voici comment aider :

Fork le repo
Crée une branche (git checkout -b feature/ma-feature)
Apporte tes modifications
Fais un commit (git commit -m "Ajout de ma feature")
Pousse tes modifications (git push origin feature/ma-feature)
Crée une pull request 🚀
📌 Licence
Ce projet est sous licence MIT. Tu es libre de l'utiliser, le modifier et le partager.

🚀 Merci de votre intérêt pour SolidarityConnect ! Ensemble, créons une communauté plus solidaire ! 🤝