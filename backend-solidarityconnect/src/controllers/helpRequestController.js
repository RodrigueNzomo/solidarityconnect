const db = require("../models");

/**
 * @desc    Créer une demande d'aide
 * @route   POST /api/help-requests
 * @access  Privé
 */
exports.createRequest = async (req, res) => {
  try {
    const { title, description, category, location } = req.body;
    
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    const newRequest = await db.HelpRequest.create({
      userId: req.user.id,
      title,
      description,
      category,
      location,
    });

    res.status(201).json({ message: "Demande créée", request: newRequest });
  } catch (error) {
    console.error("❌ Erreur lors de la création de la demande :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * @desc    Récupérer toutes les demandes d'aide
 * @route   GET /api/help-requests
 * @access  Public
 */
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await db.HelpRequest.findAll();
    res.json(requests);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des demandes :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * @desc    Récupérer une demande d'aide par son ID
 * @route   GET /api/help-requests/:id
 * @access  Public
 */
exports.getRequestById = async (req, res) => {
  try {
    const request = await db.HelpRequest.findByPk(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Demande non trouvée" });
    }
    res.json(request);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération de la demande :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * @desc    Mettre à jour une demande d'aide
 * @route   PUT /api/help-requests/:id
 * @access  Privé
 */
exports.updateRequest = async (req, res) => {
  try {
    const request = await db.HelpRequest.findByPk(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Demande non trouvée" });
    }

    if (request.userId !== req.user.id) {
      return res.status(403).json({ message: "Non autorisé" });
    }

    await request.update(req.body);
    res.json({ message: "Demande mise à jour", request });
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * @desc    Supprimer une demande d'aide
 * @route   DELETE /api/help-requests/:id
 * @access  Privé
 */
exports.deleteRequest = async (req, res) => {
  try {
    const request = await db.HelpRequest.findByPk(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Demande non trouvée" });
    }

    if (request.userId !== req.user.id) {
      return res.status(403).json({ message: "Non autorisé" });
    }

    await request.destroy();
    res.json({ message: "Demande supprimée" });
  } catch (error) {
    console.error("❌ Erreur lors de la suppression :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
