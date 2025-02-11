const db = require("../models");

/**
 * @desc    Envoyer un message
 * @route   POST /api/messages
 * @access  Privé
 */
exports.sendMessage = async (req, res) => {
  try {
    const { recipientId, content } = req.body;

    if (!recipientId || !content) return res.status(400).json({ message: "Données incomplètes" });

    const message = await db.Message.create({ senderId: req.user.id, recipientId, content });

    res.status(201).json({ message: "Message envoyé", data: message });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

/**
 * @desc    Voir la conversation entre deux utilisateurs
 * @route   GET /api/messages/conversation/:userId
 * @access  Privé
 */
exports.getConversation = async (req, res) => {
  try {
    const messages = await db.Message.findAll({
      where: {
        [db.Sequelize.Op.or]: [
          { senderId: req.user.id, recipientId: req.params.userId },
          { senderId: req.params.userId, recipientId: req.user.id }
        ]
      },
      order: [["createdAt", "ASC"]]
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
