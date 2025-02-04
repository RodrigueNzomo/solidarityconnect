// Définition du modèle 'User' avec Sequelize
module.exports = (sequelize, DataTypes) => {
  // Définition du modèle User avec les attributs nécessaires
  const User = sequelize.define("User", {
    
    // ID unique pour chaque utilisateur, utilisé comme clé primaire, avec auto-incrémentation
    id: { 
      type: DataTypes.INTEGER,  // Type de la donnée : entier
      primaryKey: true,         // Définit cette colonne comme la clé primaire
      autoIncrement: true       // Active l'auto-incrémentation pour l'ID
    },
    
    // Le nom d'utilisateur, qui ne peut pas être nul et doit être unique
    username: { 
      type: DataTypes.STRING,    // Type de la donnée : chaîne de caractères
      allowNull: false,          // Ne peut pas être nul
      unique: true                // Doit être unique dans la base de données
    },
    
    // L'email de l'utilisateur, qui ne peut pas être nul et doit être unique
    email: { 
      type: DataTypes.STRING,    // Type de la donnée : chaîne de caractères
      allowNull: false,          // Ne peut pas être nul
      unique: true                // Doit être unique dans la base de données
    },
    
    // Le mot de passe de l'utilisateur, qui ne peut pas être nul
    password: { 
      type: DataTypes.STRING,    // Type de la donnée : chaîne de caractères
      allowNull: false            // Ne peut pas être nul
    },
  
  });

  // Retourne le modèle User pour qu'il soit utilisé ailleurs dans l'application
  return User;
};
