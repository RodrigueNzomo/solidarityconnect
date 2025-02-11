// 📌 Importation des dépendances nécessaires
const express = require("express");
const authController = require("../controllers/authController"); // ✅ Import de l'objet au lieu de la déstructuration
const verifyToken = require("../middlewares/verifyToken"); // ✅ Protection des routes sécurisées
const rateLimit = require("express-rate-limit");

const router = express.Router();

// 📌 Protection contre les attaques de force brute sur la connexion
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Maximum de 5 tentatives par IP
  message: { error: "Trop de tentatives. Réessayez plus tard." }
});

// 📌 Vérification des fonctions importées
console.log("🔍 DEBUG - Contrôleurs importés :", authController);

if (!authController.register || !authController.login) {
  console.error("❌ Erreur critique : Certaines fonctions d'authController sont manquantes !");
  process.exit(1); // Arrêter l'application si les contrôleurs ne sont pas bien importés
}

// 📌 Définition des routes d'authentification

/**
 * @route   POST /api/auth/register
 * @desc    Inscription d'un nouvel utilisateur
 * @access  Public
 */
router.post("/register", authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Connexion d'un utilisateur existant
 * @access  Public
 */
router.post("/login", loginLimiter, authController.login);

/**
 * @route   GET /api/auth/me
 * @desc    Récupérer le profil utilisateur connecté
 * @access  Privé (nécessite un token)
 */
router.get("/me", verifyToken, authController.getProfile);

/**
 * @route   GET /api/auth/refresh-token
 * @desc    Rafraîchir le token JWT
 * @access  Privé (nécessite un token)
 */
router.get("/refresh-token", verifyToken, authController.refreshToken);

// 📌 Exportation du routeur
module.exports = router;
