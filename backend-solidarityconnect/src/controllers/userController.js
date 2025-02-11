const db = require("../models");

/**
 * @desc    Récupérer le profil utilisateur
 * @route   GET /api/users/profile
 * @access  Privé (nécessite un token)
 */
exports.getProfile = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.user.id, { attributes: { exclude: ["password"] } });

    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * @desc    Mettre à jour le profil utilisateur
 * @route   PUT /api/users/profile
 * @access  Privé
 */
exports.updateProfile = async (req, res) => {
  try {
    const { username, email, phone, address, job } = req.body;
    const user = await db.User.findByPk(req.user.id);

    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    await user.update({ username, email, phone, address, job });

    res.json({ message: "Profil mis à jour", user });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * @desc    Supprimer un compte utilisateur
 * @route   DELETE /api/users/profile
 * @access  Privé
 */
exports.deleteAccount = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.user.id);

    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    await user.destroy();
    res.json({ message: "Compte supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
