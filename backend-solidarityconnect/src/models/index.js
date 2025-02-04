// Importation de Sequelize et de l'instance de connexion à la base de données
const { Sequelize } = require("sequelize");  // Importation de Sequelize (ORM pour MySQL)
const sequelize = require("../config/database");  // Récupération de la configuration de la base de données

// Création d'un objet pour stocker l'instance Sequelize et l'instance de connexion
const db = {};
db.Sequelize = Sequelize;  // Ajout de Sequelize à l'objet db pour un accès direct
db.sequelize = sequelize;  // Ajout de l'instance de connexion à la base de données à l'objet db

// Importation des modèles et leur association avec l'instance Sequelize
// Dans ce cas, le modèle 'User' est importé et lié à l'instance 'sequelize' pour permettre l'interaction avec la base de données
db.User = require("./User")(sequelize, Sequelize);  // Création du modèle 'User'

// Exportation de l'objet 'db' pour permettre l'accès aux modèles dans d'autres fichiers de l'application
module.exports = db;
