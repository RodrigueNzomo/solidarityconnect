📌 README pour le Frontend (Angular 17 + SCSS)
📂 Frontend - SolidarityConnect
Ce répertoire contient le code source du frontend développé avec Angular 17, permettant aux utilisateurs d'interagir avec l'application SolidarityConnect.

🏗 Installation et Configuration
1️⃣ Prérequis
Assurez-vous d'avoir installé :

Node.js 18+
Angular CLI
Docker (optionnel)
2️⃣ Cloner le projet
bash
Copier
Modifier
git clone https://github.com/RodrigueNzomo/solidarityconnect.git
cd solidarityconnect/frontend-solidarityconnect
3️⃣ Installer les dépendances
bash
Copier
Modifier
npm install
🚀 Démarrer l’Application
En mode développement
bash
Copier
Modifier
ng serve
L’interface est accessible à : http://localhost:4200

En mode production
bash
Copier
Modifier
ng build --configuration=production
Les fichiers de build sont générés dans dist/frontend-solidarityconnect/.

📜 Structure du Projet
bash
Copier
Modifier
frontend-solidarityconnect/
│── src/
│   ├── app/                    # Composants Angular
│   ├── assets/                 # Images, icônes, styles globaux
│   ├── environments/           # Configurations des environnements
│   ├── styles.scss             # Styles globaux
│── angular.json                # Configuration Angular
│── package.json                # Dépendances du projet
│── tsconfig.json               # Configuration TypeScript
🌍 API Backend
L’application se connecte au backend via environment.ts :

typescript
Copier
Modifier
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
🛠 Tests
Lancer les tests unitaires :

bash
Copier
Modifier
ng test
Lancer les tests end-to-end :

bash
Copier
Modifier
ng e2e
🐳 Utilisation avec Docker
1️⃣ Builder et exécuter l’image
bash
Copier
Modifier
docker build -t solidarityconnect_frontend .
docker run -d --name frontend_container -p 8081:80 solidarityconnect_frontend
L'application est accessible à : http://localhost:8081

📌 Contribuer
Fork le repo
Crée une branche (git checkout -b feature/ma-feature)
Ajoute tes modifications
Fais un commit (git commit -m "Ajout de ma feature")
Pousse tes modifications (git push origin feature/ma-feature)
Crée une pull request
📧 Contact : r.nzomo.tmrcomputing@gmail.com

🚀 Merci de contribuer au développement du frontend de SolidarityConnect !
# **SolidarityConnect**

**SolidarityConnect** est une plateforme numérique dédiée à la gestion des services sociaux pour la diaspora camerounaise au Congo-Brazzaville. Ce projet comprend une application **frontend** et **backend** qui facilite la gestion des membres, des contributions sociales et des demandes d’assistance. Il permet au comité de gestion de suivre les contributions, gérer les inscriptions et assurer une communication fluide entre les utilisateurs et le comité.

## **Technologies utilisées**
- **Backend** : Node.js, Express, JWT, Sequelize, MySQL
- **Frontend** : Angular 17, TypeScript, CSS
- **Containerisation** : Docker pour le déploiement
- **Gestion de version** : Git, GitHub

---

## **Fonctionnalités principales**

### **Backend**
- **API RESTful** développée avec Node.js et Express
- **Authentification sécurisée** avec JWT (JSON Web Tokens)
- Connexion à la base de données **MySQL** via Sequelize pour gérer les utilisateurs et transactions
- Gestion des erreurs et des réponses API formatées pour faciliter l’intégration avec le frontend

### **Frontend**
- Application web développée avec **Angular 17**, utilisant **TypeScript** et **CSS**
- Pages **d'inscription** et **de connexion** pour enregistrer et authentifier les utilisateurs
- Intégration des **appels API** pour envoyer et récupérer les données du backend
- Mise en place de **routes protégées** pour sécuriser l'accès aux pages réservées aux utilisateurs authentifiés

### **Fonctionnalités supplémentaires**
- Collecte des contributions sociales via une **interface simple et intuitive**
- Accès facile à l'**historique des transactions** et aux notifications importantes
- Interface de **gestion pour le comité**, permettant de visualiser et gérer les membres, les contributions et les demandes d'assistance

---

## **Installation**

### **Backend**
1. **Clonez le dépôt** :
   ```bash
   git clone https://github.com/username/solidarityconnect.git
   cd backend-solidarityconnect
   ```

2. **Installez les dépendances** :
   ```bash
   npm install
   ```

3. **Configurez votre fichier `.env`** avec les informations de la base de données et les secrets JWT.

4. **Démarrez le serveur** :
   ```bash
   npm run dev
   ```

---

### **Frontend**
1. **Clonez le dépôt** :
   ```bash
   git clone https://github.com/username/solidarityconnect.git
   cd frontend-solidarityconnect
   ```

2. **Installez les dépendances** :
   ```bash
   npm install
   ```

3. **Lancez l'application Angular** :
   ```bash
   ng serve
   ```

---

### **Docker**
Si vous souhaitez exécuter les applications **backend** et **frontend** dans des conteneurs Docker, suivez ces étapes pour construire et exécuter les images Docker.

#### **Backend Docker**
1. **Construisez l'image Docker** :
   ```bash
   docker build -t backend-solidarityconnect .
   ```

2. **Exécutez le conteneur** :
   ```bash
   docker run -p 5000:5000 backend-solidarityconnect
   ```

#### **Frontend Docker**
1. **Construisez l'image Docker** :
   ```bash
   docker build -t frontend-solidarityconnect .
   ```

2. **Exécutez le conteneur** :
   ```bash
   docker run -p 80:80 frontend-solidarityconnect
   ```

---

## **Contribution**

Nous encourageons les contributions à ce projet ! Si vous souhaitez contribuer, veuillez suivre ces étapes :

1. **Fork ce projet**.
2. **Créez une branche pour votre fonctionnalité** :
   ```bash
   git checkout -b feature/feature-name
   ```

3. **Faites des modifications et ajoutez-les** :
   ```bash
   git add .
   ```

4. **Faites un commit de vos modifications** :
   ```bash
   git commit -m 'Ajout de fonctionnalité X'
   ```

5. **Poussez vos changements** :
   ```bash
   git push origin feature/feature-name
   ```

6. **Créez une Pull Request** pour réviser et intégrer vos changements.

---

## **License**
Ce projet est sous **licence MIT**.

---

### **Ressources supplémentaires**

Pour plus d'informations sur l'utilisation d'Angular CLI et les commandes disponibles, vous pouvez consulter la page [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

---

Cette structure présente votre projet de manière professionnelle, tout en offrant un guide détaillé sur l'installation, la configuration, et la contribution, tout en expliquant les technologies utilisées et les principales fonctionnalités de votre application **SolidarityConnect**.