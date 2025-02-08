const bcrypt = require("bcrypt");
// Explication : Importe la bibliothèque `bcrypt` pour hacher les mots de passe avant leur stockage en base de données.
// Alternative : Si vous souhaitez utiliser une bibliothèque plus moderne ou légère, envisagez `argon2` ou `scrypt`.

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    // Définition du modèle `User` avec ses attributs et leurs validations.

    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    // Explication : La colonne `id` est définie comme un entier auto-incrémenté et sert de clé primaire pour identifier chaque utilisateur.
    // Alternative : Pour des systèmes nécessitant des identifiants globaux uniques, remplacez `INTEGER` par `UUID` et utilisez `defaultValue: DataTypes.UUIDV4`.

    firstName: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    // Explication : La colonne `firstName` est une chaîne de caractères obligatoire. Chaque utilisateur doit avoir un prénom défini.
    // Alternative : Ajoutez des validations supplémentaires pour interdire certains caractères spéciaux ou limiter la longueur (par exemple, `validate: { len: [2, 50] }`).

    lastName: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    // Explication : La colonne `lastName` est une chaîne de caractères obligatoire. Chaque utilisateur doit avoir un nom défini.
    // Alternative : Comme pour `firstName`, ajoutez des validations pour renforcer la qualité des données.

    username: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true 
    },
    // Explication : La colonne `username` est une chaîne de caractères obligatoire et doit être unique dans toute la table.
    // Alternative : Si vous permettez plusieurs utilisateurs avec le même nom d'utilisateur dans des contextes différents, supprimez `unique: true` et implémentez une contrainte composite.

    email: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true 
    },
    // Explication : La colonne `email` est une chaîne de caractères obligatoire et doit être unique dans toute la table.
    // Alternative : Ajoutez une validation pour vérifier le format e-mail (`validate: { isEmail: true }`) si ce n'est pas déjà inclus dans vos configurations.

    phone: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true 
    },
    // Explication : La colonne `phone` est une chaîne de caractères obligatoire et doit être unique dans toute la table.
    // Alternative : Implémentez une validation personnalisée pour vérifier que la valeur correspond à un format de numéro de téléphone valide (par exemple, `validate: { is: /^[0-9]{9,15}$/i }`).

    address: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    // Explication : La colonne `address` est une chaîne de caractères facultative. Elle peut être vide si l'utilisateur ne souhaite pas fournir d'adresse.
    // Alternative : Si l'adresse est obligatoire, changez `allowNull: true` en `allowNull: false` et assurez-vous que cette valeur est toujours fournie lors de la création.

    specialty: { 
      type: DataTypes.ENUM("Développeur", "Admin Système", "Data Analyst", "Cyber Sécurité", "Autre"), 
      allowNull: false, 
      defaultValue: "Autre" 
    },
    // Explication : La colonne `specialty` est une énumération limitée à un ensemble prédéfini de valeurs. Une valeur par défaut ("Autre") est définie si aucune spécialité n'est spécifiée.
    // Alternative : Si vous prévoyez des spécialités extensibles, remplacez `ENUM` par `STRING` et gérez les options via une logique métier ou une table séparée.

    password: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    // Explication : La colonne `password` est une chaîne de caractères obligatoire. Le mot de passe sera haché avant d'être stocké grâce au hook `beforeCreate`.
    // Alternative : Ajoutez des validations pour imposer des critères de complexité (par exemple, longueur minimale, présence de chiffres ou de majuscules).

    role: { 
      type: DataTypes.ENUM("admin", "user", "moderator"), 
      defaultValue: "user" 
    }
    // Explication : La colonne `role` est une énumération limitée à trois rôles possibles. Une valeur par défaut ("user") est définie si aucun rôle n'est spécifié.
    // Alternative : Si vous avez besoin de rôles personnalisables ou extensibles, remplacez `ENUM` par `STRING` et gérez les permissions via une table dédiée ou une logique métier.
  }, {
    timestamps: true,
    // Explication : Active automatiquement les champs `createdAt` et `updatedAt` pour suivre les modifications dans la base de données.
    // Alternative : Si ces champs ne sont pas nécessaires, définissez `timestamps: false` pour réduire la taille de la table.

    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
      // Explication : Ce hook est exécuté avant la création d'un utilisateur. Il hache le mot de passe avec `bcrypt` pour renforcer la sécurité.
      // Alternative : Utilisez une bibliothèque comme `argon2` pour un hachage plus robuste ou ajustez le nombre de rounds de salage (`genSalt`) selon vos besoins.
    }
  });
  return User;
};