// Importation des dépendances nécessaires
const express = require("express");  // Framework Express pour gérer les routes et le serveur
const dotenv = require("dotenv");   // Bibliothèque pour charger les variables d'environnement
const cors = require("cors");       // Middleware pour gérer les problèmes de Cross-Origin Resource Sharing (CORS)
const db = require("./models");     // Importation des modèles (incluant Sequelize et la connexion à la base de données)

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

// Initialisation de l'application Express après avoir chargé les variables d'environnement
const app = express();

// Middleware : permet de parser les corps de requêtes JSON
app.use(express.json());  // Middleware pour analyser les données JSON dans les requêtes

// Middleware : permettre les requêtes cross-origin depuis tous les domaines
app.use(cors());  // Permet à l'application de recevoir des requêtes provenant de différents domaines

// Importation des routes après initialisation de l'application
const authRoutes = require("./routes/authRoutes");  // Import des routes liées à l'authentification

// Utilisation des routes définies pour l'authentification
app.use("/api/auth", authRoutes);  // Tous les chemins commençant par "/api/auth" utiliseront les routes d'authentification

// Définition du port du serveur, soit à partir de la variable d'environnement, soit par défaut 5000
const PORT = process.env.PORT || 5000;

// Synchronisation de la base de données avec Sequelize
// La méthode `sync` crée les tables dans la base de données en fonction des modèles définis
db.sequelize.sync({ force: false }).then(() => {
  console.log("Base de données synchronisée !");  // Affichage d'un message de succès lorsque la synchronisation est terminée
});

// Démarrage du serveur sur le port spécifié
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);  // Affichage d'un message pour indiquer que le serveur fonctionne
});
