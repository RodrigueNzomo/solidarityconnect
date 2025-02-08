// Importation des dépendances nécessaires
const express = require("express"); 
// Explication : Importe le framework Express, utilisé pour créer des routes et gérer les requêtes HTTP.
// Alternative : Si vous travaillez avec TypeScript, utilisez des imports ES6 (`import express from "express";`) et définissez explicitement les types.

const { register, login } = require("../controllers/authController"); 
// Explication : Importe les fonctions `register` et `login` depuis le fichier `authController`. Ces fonctions gèrent respectivement l'enregistrement et la connexion des utilisateurs.
// Alternative : Si vous avez besoin de plus de contrôle sur les imports ou si le fichier devient volumineux, envisagez d'utiliser un gestionnaire de dépendances ou de diviser les contrôleurs en plusieurs fichiers.

// Création du routeur Express
const router = express.Router(); 
// Explication : Crée une instance de routeur Express. Ce routeur permet de regrouper toutes les routes liées à l'authentification dans un seul endroit pour une meilleure organisation.
// Alternative : Pour des applications plus complexes, envisagez d'utiliser des routeurs imbriqués ou des middlewares personnalisés pour structurer davantage vos routes.

// Définition de la route POST pour l'enregistrement d'un nouvel utilisateur
// Cette route appelle la fonction 'register' dans le contrôleur 'authController'
router.post("/register", register); 
// Explication : Définit une route POST pour `/register`, qui appelle la fonction `register` lorsqu'une requête est reçue. Cette fonction est responsable de l'enregistrement d'un nouvel utilisateur.
// Alternative : Ajoutez des middlewares supplémentaires avant `register` pour valider les données entrantes (par exemple, avec Joi ou Celebrate) ou pour journaliser les requêtes.

// Définition de la route POST pour la connexion d'un utilisateur existant
// Cette route appelle la fonction 'login' dans le contrôleur 'authController'
router.post("/login", login); 
// Explication : Définit une route POST pour `/login`, qui appelle la fonction `login` lorsqu'une requête est reçue. Cette fonction est responsable de la connexion d'un utilisateur existant.
// Alternative : Implémentez des mécanismes de rate-limiting pour éviter les attaques par force brute sur cette route.

// Exportation du routeur pour qu'il soit utilisé dans l'application principale
module.exports = router; 
// Explication : Exporte le routeur pour qu'il puisse être importé et utilisé dans l'application principale (généralement dans le fichier `app.js` ou `index.js`).
// Alternative : Si vous travaillez avec TypeScript, utilisez un export ES6 avec des types explicites (`export default router;`) pour améliorer la lisibilité et éviter les erreurs de typage.