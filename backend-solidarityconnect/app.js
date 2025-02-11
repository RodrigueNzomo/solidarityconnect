require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/database"); // ✅ Utilisation propre de Sequelize
const routes = require("./src/routes/apiRoutes");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();

// ✅ Middlewares globaux
app.use(express.json());
app.use(cors());

// ✅ Chargement des routes
app.use("/api", routes);
app.use(errorHandler);

// ✅ Fonction de connexion et synchronisation de la base de données
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion MySQL réussie !");

    await sequelize.sync(); // ✅ Synchronisation propre (pas d'alter en production)
    console.log("✅ Base de données synchronisée !");

    // ✅ Démarrer le serveur après la connexion réussie
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Serveur en cours d'exécution sur http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Erreur de connexion MySQL :", error);
    process.exit(1); // ✅ Arrêt du serveur en cas d'échec critique
  }
};

// 🚀 Lancer le serveur après vérification MySQL
startServer();

app.get("/", (req, res) => {
  res.send("🚀 Backend SolidarityConnect fonctionne !");
});
