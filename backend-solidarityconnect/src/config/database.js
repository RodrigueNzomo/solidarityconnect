const Sequelize = require("sequelize"); // ✅ Correction : Import propre
require("dotenv").config();

// 🔍 Vérification des variables d'environnement obligatoires
const REQUIRED_VARS = ["DB_NAME", "DB_USER", "DB_HOST", "DB_PASSWORD"];
const missingVars = REQUIRED_VARS.filter((v) => !process.env[v]);

if (missingVars.length) {
  console.error(`❌ Erreur : Variables d'environnement manquantes : ${missingVars.join(", ")}`);
  process.exit(1);
}

console.info("🔍 DEBUG - Variables d'environnement chargées avec succès.");

// ✅ Initialisation de la connexion MySQL avec Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306, // 🚀 Définit 3306 par défaut si `DB_PORT` est absent
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      connectTimeout: 60000,
    },
    logging: process.env.NODE_ENV !== "production" ? console.log : false,
    retry: {
      max: 5, // 🔄 Tente 5 fois avant d'abandonner
    },
  }
);

// 🔥 Vérification de la connexion à MySQL
sequelize
  .authenticate()
  .then(() => {
    console.info("✅ Connexion à MySQL réussie");
  })
  .catch((error) => {
    console.error("❌ Erreur de connexion à MySQL :", error);
  });
  module.exports = sequelize; // ✅ On exporte bien l'instance Sequelize