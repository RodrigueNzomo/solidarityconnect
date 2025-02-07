const { Sequelize } = require("sequelize");
require("dotenv").config();

console.log("🔍 DEBUG - Vérification des variables d'environnement :", {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_PASSWORD: process.env.DB_PASSWORD ? "✅ Présent" : "❌ Manquant",

});

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,

  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: process.env.NODE_ENV !== "production" ? console.log : false,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion MySQL réussie !");
    await sequelize.sync({ alter: true });
    console.log("✅ Base de données synchronisée !");
  } catch (error) {
    console.error("❌ Erreur de connexion MySQL :", error);
    process.exit(1);
  }
})();

module.exports = sequelize;