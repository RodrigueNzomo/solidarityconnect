const Sequelize = require("sequelize"); // ✅ Corrigé : importer Sequelize correctement
const sequelize = require("../config/database"); // ✅ Vérifier que `database.js` exporte `sequelize`
const db = {};

// 📌 Stocker Sequelize et l'instance de connexion
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ✅ Initialiser le modèle correctement avec `sequelize` et `Sequelize.DataTypes`
db.User = require("./User")(sequelize, Sequelize.DataTypes);

/// Synchroniser les modèles avec la base de données si nécessaire
db.sequelize.sync({ alter: true }) // 🟢 `alter: true` ajuste les tables sans perte de données
.then(() => console.log("✅ Synchronisation des modèles réussie"))
.catch((error) => console.error("❌ Erreur lors de la synchronisation des modèles :", error));

// 📌 Vérification de la connexion à MySQL
db.sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connexion à MySQL réussie !");
  })
  .catch((error) => {
    console.error("❌ Erreur de connexion à MySQL :", error);
  });

module.exports = db;
