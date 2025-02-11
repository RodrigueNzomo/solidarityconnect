const express = require("express");
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

/**
 * @route   GET /api/users/profile
 * @desc    Récupérer le profil utilisateur connecté
 * @access  Privé (Nécessite un token)
 */
router.get("/profile", verifyToken, userController.getProfile);

/**
 * @route   PUT /api/users/profile
 * @desc    Modifier les informations du profil utilisateur
 * @access  Privé
 */
router.put("/profile", verifyToken, userController.updateProfile);

/**
 * @route   DELETE /api/users/profile
 * @desc    Supprimer le compte utilisateur
 * @access  Privé
 */
router.delete("/profile", verifyToken, userController.deleteAccount);

module.exports = router;
