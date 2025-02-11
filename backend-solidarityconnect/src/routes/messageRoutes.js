const express = require("express");
const messageController = require("../controllers/messageController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

/**
 * @route   POST /api/messages
 * @desc    Envoyer un message à un autre utilisateur
 * @access  Privé
 */
router.post("/", verifyToken, messageController.sendMessage);

/**
 * @route   GET /api/messages/conversation/:userId
 * @desc    Récupérer la conversation entre l'utilisateur connecté et un autre utilisateur
 * @access  Privé
 */
router.get("/conversation/:userId", verifyToken, messageController.getConversation);

/**
 * @route   DELETE /api/messages/:messageId
 * @desc    Supprimer un message
 * @access  Privé
 */
router.delete("/:messageId", verifyToken, messageController.deleteMessage);

module.exports = router;
