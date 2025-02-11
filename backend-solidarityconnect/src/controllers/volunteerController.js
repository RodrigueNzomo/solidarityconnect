const db = require("../models");

/**
 * @desc    Postuler à une demande d’aide
 * @route   POST /api/volunteers/apply/:requestId
 * @access  Privé
 */
exports.applyForHelp = async (req, res) => {
  try {
    const request = await db.HelpRequest.findByPk(req.params.requestId);

    if (!request) return res.status(404).json({ message: "Demande non trouvée" });

    await db.Volunteer.create({ userId: req.user.id, helpRequestId: request.id });

    res.json({ message: "Candidature envoyée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
