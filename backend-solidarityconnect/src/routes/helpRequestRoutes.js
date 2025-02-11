const express = require("express");
const helpRequestController = require("../controllers/helpRequestController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// Vérifier que toutes les fonctions existent avant d'ajouter les routes
if (
  !helpRequestController.createRequest ||
  !helpRequestController.getAllRequests ||
  !helpRequestController.getRequestById ||
  !helpRequestController.updateRequest ||
  !helpRequestController.deleteRequest
) {
  console.error("❌ ERREUR: Certaines fonctions du contrôleur helpRequestController sont manquantes !");
  process.exit(1); // Stoppe l'exécution si des fonctions sont absentes
}

/**
 * @route   POST /api/help-requests
 * @desc    Créer une nouvelle demande d'aide
 * @access  Privé
 */
router.post("/", verifyToken, helpRequestController.createRequest);

/**
 * @route   GET /api/help-requests
 * @desc    Récupérer toutes les demandes d'aide
 * @access  Public
 */
router.get("/", helpRequestController.getAllRequests);

/**
 * @route   GET /api/help-requests/:id
 * @desc    Récupérer une demande d'aide par son ID
 * @access  Public
 */
router.get("/:id", helpRequestController.getRequestById);

/**
 * @route   PUT /api/help-requests/:id
 * @desc    Mettre à jour une demande d'aide
 * @access  Privé
 */
router.put("/:id", verifyToken, helpRequestController.updateRequest);

/**
 * @route   DELETE /api/help-requests/:id
 * @desc    Supprimer une demande d'aide
 * @access  Privé
 */
router.delete("/:id", verifyToken, helpRequestController.deleteRequest);

module.exports = router;
