/**
 * Middleware global de gestion des erreurs pour Express.
 * Il intercepte toutes les erreurs non gérées et envoie une réponse JSON appropriée.
 *
 * @param {Object} err - L'objet erreur capturé
 * @param {Object} req - L'objet de requête Express
 * @param {Object} res - L'objet de réponse Express
 * @param {Function} next - La fonction de passage au middleware suivant
 */
const errorHandler = (err, req, res, next) => {
    console.error("❌ ERREUR SERVEUR :", err); // Loguer l'erreur pour le débogage
  
    // Définir le code d'état HTTP (500 si non défini)
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  
    res.status(statusCode).json({
      success: false,
      message: err.message || "Erreur interne du serveur",
      stack: process.env.NODE_ENV === "production" ? null : err.stack, // Masquer le stack trace en production
    });
  };
  
  module.exports = errorHandler;
  