// Importation des dépendances nécessaires
const express = require("express"); // Importation du framework Express pour la gestion des routes
const { register, login } = require("../controllers/authController"); // Importation des contrôleurs de gestion de l'authentification

// Création du routeur Express
const router = express.Router();

// Définition de la route POST pour l'enregistrement d'un nouvel utilisateur
// Cette route appelle la fonction 'register' dans le contrôleur 'authController'
router.post("/register", register);

// Définition de la route POST pour la connexion d'un utilisateur existant
// Cette route appelle la fonction 'login' dans le contrôleur 'authController'
router.post("/login", login);

// Exportation du routeur pour qu'il soit utilisé dans l'application principale
module.exports = router;
