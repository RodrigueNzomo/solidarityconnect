const db = require("../models");

/**
 * @desc    Récupérer tous les utilisateurs
 * @route   GET /api/admin/users
 * @access  Admin
 */
exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") { // 🔹 Vérifier si l'utilisateur est admin
      return res.status(403).json({ message: "Accès interdit. Seuls les administrateurs peuvent voir tous les utilisateurs." });
    }

    const users = await db.User.findAll({ attributes: { exclude: ["password"] } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * @desc    Modifier le rôle d'un utilisateur (Admin Only)
 * @route   PATCH /api/admin/users/:id/role
 * @access  Admin
 */
exports.changeUserRole = async (req, res) => {
  try {
    if (req.user.role !== "admin") { // 🔹 Vérification admin
      return res.status(403).json({ message: "Accès interdit. Seuls les administrateurs peuvent modifier les rôles." });
    }

    const { newRole } = req.body;
    const { id } = req.params;

    if (!["admin", "moderator", "user"].includes(newRole)) { // 🔹 Vérification du rôle valide
      return res.status(400).json({ message: "Rôle invalide." });
    }

    const user = await db.User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable." });

    user.role = newRole;
    await user.save();

    res.json({ message: `Le rôle de ${user.firstName} a été changé en ${newRole}.` });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * @desc    Supprimer un utilisateur
 * @route   DELETE /api/admin/users/:id
 * @access  Admin
 */
exports.deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") { // 🔹 Vérifier si l'utilisateur est admin
      return res.status(403).json({ message: "Accès interdit. Seuls les administrateurs peuvent supprimer des utilisateurs." });
    }

    const user = await db.User.findByPk(req.params.id);
    
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    await user.destroy();
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
