// Définition du modèle 'User' avec Sequelize
module.exports = (sequelize, DataTypes) => {
  // Explication : Cette fonction exporte un modèle Sequelize nommé `User`. Elle prend en paramètres l'instance de connexion `sequelize` et l'objet `DataTypes` pour définir les types de données.

  // Définition du modèle User avec les attributs nécessaires
  const User = sequelize.define("User", {
    // ID unique pour chaque utilisateur, utilisé comme clé primaire, avec auto-incrémentation
    id: { 
      type: DataTypes.INTEGER,  
      // Explication : Spécifie que la colonne `id` est de type entier.
      primaryKey: true,         
      // Explication : Définit cette colonne comme la clé primaire du modèle.
      autoIncrement: true       
      // Explication : Active l'auto-incrémentation pour générer automatiquement des valeurs uniques pour chaque enregistrement.
      // Alternative : Si vous utilisez un UUID ou un autre mécanisme d'identification, remplacez `INTEGER` par `UUID` et utilisez `defaultValue: DataTypes.UUIDV4`.
    },
    
    // Le nom d'utilisateur, qui ne peut pas être nul et doit être unique
    username: { 
      type: DataTypes.STRING,    
      // Explication : Spécifie que la colonne `username` est de type chaîne de caractères.
      allowNull: false,          
      // Explication : Empêche cette colonne d'avoir une valeur nulle. Cela garantit que chaque utilisateur a un nom d'utilisateur défini.
      unique: true                
      // Explication : Rend cette colonne unique dans toute la table, empêchant ainsi deux utilisateurs d'avoir le même nom d'utilisateur.
      // Alternative : Si vous voulez autoriser plusieurs utilisateurs à avoir le même nom mais dans des contextes différents, supprimez `unique: true` et ajoutez une contrainte composite (par exemple, basée sur `username` et un autre champ).
    },
    
    // L'email de l'utilisateur, qui ne peut pas être nul et doit être unique
    email: { 
      type: DataTypes.STRING,    
      // Explication : Spécifie que la colonne `email` est de type chaîne de caractères.
      allowNull: false,          
      // Explication : Empêche cette colonne d'avoir une valeur nulle. Cela garantit que chaque utilisateur a une adresse e-mail définie.
      unique: true                
      // Explication : Rend cette colonne unique dans toute la table, empêchant ainsi deux utilisateurs d'avoir la même adresse e-mail.
      // Alternative : Pour valider le format de l'e-mail, ajoutez une validation personnalisée avec `validate: { isEmail: true }`.
    },
    
    // Le mot de passe de l'utilisateur, qui ne peut pas être nul
    password: { 
      type: DataTypes.STRING,    
      // Explication : Spécifie que la colonne `password` est de type chaîne de caractères.
      allowNull: false           
      // Explication : Empêche cette colonne d'avoir une valeur nulle. Cela garantit que chaque utilisateur a un mot de passe défini.
      // Alternative : Pour renforcer la sécurité, stockez uniquement le hachage du mot de passe et non le mot de passe brut. Ajoutez également une validation pour vérifier la longueur minimale du mot de passe.
    },
  
  });
  // Retourne le modèle User pour qu'il soit utilisé ailleurs dans l'application
  return User;
  // Explication : Le modèle `User` est retourné pour être utilisé dans d'autres parties de l'application, telles que les routes ou les contrôleurs.
  // Alternative : Si vous avez besoin de relations entre modèles (par exemple, un utilisateur peut avoir plusieurs posts), définissez ces relations ici ou dans un fichier dédié aux associations.
};