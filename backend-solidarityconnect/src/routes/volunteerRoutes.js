const express = require("express");
const volunteerController = require("../controllers/volunteerController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

/**
 * @route   POST /api/volunteers/apply/:requestId
 * @desc    Postuler en tant que bénévole sur une demande d'aide
 * @access  Privé
 */
router.post("/apply/:requestId", verifyToken, volunteerController.applyForHelp);

/**
 * @route   GET /api/volunteers/applications
 * @desc    Voir toutes les candidatures envoyées par un utilisateur
 * @access  Privé
 */
router.get("/applications", verifyToken, volunteerController.getUserApplications);

/**
 * @route   DELETE /api/volunteers/applications/:id
 * @desc    Annuler une candidature
 * @access  Privé
 */
router.delete("/applications/:id", verifyToken, volunteerController.cancelApplication);

module.exports = router;
