const express = require("express");
const adminController = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

/**
 * @route   GET /api/admin/users
 * @desc    Récupérer tous les utilisateurs
 * @access  Admin
 */
router.get("/users", adminMiddleware, adminController.getAllUsers);

/**
 * @route   DELETE /api/admin/users/:id
 * @desc    Supprimer un utilisateur
 * @access  Admin
 */
router.delete("/users/:id", adminMiddleware, adminController.deleteUser);

/**
 * @route   GET /api/admin/help-requests
 * @desc    Récupérer toutes les demandes d'aides
 * @access  Admin
 */
router.get("/help-requests", adminMiddleware, adminController.getAllHelpRequests);

/**
 * @route   DELETE /api/admin/help-requests/:id
 * @desc    Supprimer une demande d'aide
 * @access  Admin
 */
router.delete("/help-requests/:id", adminMiddleware, adminController.deleteHelpRequest);

module.exports = router;
