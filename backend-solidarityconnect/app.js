require("dotenv").config();

console.log("🔍 DEBUG - Chargement des variables d'environnement :");
["DB_NAME", "DB_USER", "DB_HOST", "DB_PORT", "PORT", "JWT_SECRET"].forEach((key) => {
  console.log(`  - ${key}: ${process.env[key] ? "✅ Présent" : "❌ Manquant"}`);
});

const express = require("express");
const cors = require("cors");
const db = require("./src/config/database");
const routes = require("./src/routes/authRoutes");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", routes);
app.use(errorHandler);

(async () => {
  try {
    await db.authenticate();
    console.log("✅ Connexion MySQL réussie !");
    await db.sync();
    console.log("✅ Base de données synchronisée !");
  } catch (error) {
    console.error("❌ Erreur de connexion MySQL :", error);
    process.exit(1);
  }
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
