// Importation de Sequelize, un ORM pour gérer la base de données MySQL.
const { Sequelize } = require("sequelize");

// Chargement des variables d'environnement à partir du fichier .env
require("dotenv").config();

// Affichage des variables d'environnement pour déboguer et vérifier si elles sont bien chargées
console.log("🔍 DEBUG - Variables d'environnement chargées :", process.env);

// Affichage des informations de connexion MySQL pour vérifier que tout est bien configuré
console.log("🔍 Connexion MySQL avec :", {
  database: process.env.DB_NAME,  // Nom de la base de données
  user: process.env.DB_USER,      // Utilisateur MySQL
  password: process.env.DB_PASS,  // Mot de passe de l'utilisateur (à vérifier)
  host: process.env.DB_HOST,      // Hôte de la base de données (généralement 'localhost')
  port: process.env.DB_PORT       // Port MySQL (par défaut 3306)
});

// Création d'une instance de Sequelize pour gérer la connexion à la base de données MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,  // Nom de la base de données
  process.env.DB_USER,  // Nom d'utilisateur pour se connecter à la base de données
  process.env.DB_PASS,  // Mot de passe de l'utilisateur
  {
    host: process.env.DB_HOST,   // Hôte où la base de données est hébergée
    port: process.env.DB_PORT,   // Port utilisé pour se connecter à MySQL
    dialect: "mysql",            // Type de base de données utilisé (MySQL)
    logging: console.log,        // Activation du logging des requêtes SQL dans la console
  }
);

// Test de la connexion à la base de données en utilisant la méthode `authenticate` de Sequelize
sequelize.authenticate()
  .then(() => console.log("✅ Connexion MySQL réussie !"))  // Si la connexion est réussie, afficher ce message
  .catch(err => console.error("❌ Erreur de connexion MySQL :", err));  // Si une erreur survient, afficher l'erreur

// Exportation de l'instance Sequelize pour l'utiliser ailleurs dans l'application
module.exports = sequelize;
