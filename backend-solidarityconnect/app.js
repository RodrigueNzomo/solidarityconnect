// Charger les variables d'environnement dès le début
require("dotenv").config();
console.log("🔍 DEBUG - Variables d'environnement chargées :", {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET ? "✅ Présent" : "❌ Manquant"
});

const express = require("express");
const cors = require("cors");
const db = require("./src/models");

const authRoutes = require("./src/routes/authRoutes");
const errorHandler = require("./src/middlewares/errorHandler");

// Initialisation de l'application Express
const app = express();

// Middleware pour parser les requêtes en JSON
app.use(express.json());
app.use(cors());

// Définition des routes
app.use("/api/auth", authRoutes);

// Middleware de gestion des erreurs globales
app.use(errorHandler);

// Vérification de la connexion à la base de données
db.sequelize.authenticate()
  .then(() => console.log("✅ Connexion MySQL réussie !"))
  .catch(err => console.error("❌ Erreur de connexion MySQL :", err));

// Synchronisation de la base de données
db.sequelize.sync()
  .then(() => console.log("✅ Base de données synchronisée !"))
  .catch(err => console.error("❌ Erreur de synchronisation :", err));

// Lancer le serveur sur le port défini
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur en cours d'exécution sur le port ${PORT}`);
});
