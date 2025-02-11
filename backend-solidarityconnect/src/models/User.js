const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  if (!sequelize || !DataTypes) {
    console.error("❌ Sequelize ou DataTypes non définis dans User.js !");
    throw new Error("Sequelize et DataTypes doivent être fournis.");
  }

  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // Empêche les chaînes vides
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // Empêche les chaînes vides
        },
      },
      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("Homme", "Femme"),
        allowNull: false,
      },
      maritalStatus: {
        type: DataTypes.ENUM("Célibataire", "Marié(e)", "Veuf(ve)"),
        allowNull: false,
      },
      childrenCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0, // Empêche les valeurs négatives
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Validation du format email
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^[0-9]{10}$/i, // Valide un numéro de téléphone de 10 chiffres
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      job: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userRole: {
        type: DataTypes.ENUM("Personne en difficulté", "Bénévole"),
        allowNull: false,
      },
      needs: {
        type: DataTypes.ENUM(
          "Logement",
          "Nourriture",
          "Aide financière",
          "Accompagnement social"
        ),
        allowNull: true,
      },
      skills: {
        type: DataTypes.ENUM(
          "Aide médicale",
          "Aide juridique",
          "Éducation",
          "Accompagnement social"
        ),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "user", "moderator"),
        allowNull: false,
        defaultValue: "user",
      },
    },
    {
      timestamps: true, // Active createdAt et updatedAt
      hooks: {
        // Hache le mot de passe avant la création
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
        // Hache le mot de passe avant la mise à jour
        beforeUpdate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
    }
  );

  return User; // ✅ Correction : Assure le retour du modèle
};
