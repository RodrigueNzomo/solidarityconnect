// Importation de la bibliothèque jsonwebtoken pour vérifier le token JWT
const jwt = require("jsonwebtoken");

/**
 * Middleware pour vérifier la validité du token JWT.
 * Ce middleware extrait le token de l'en-tête 'Authorization' et le vérifie.
 * Si le token est valide, il ajoute les informations décodées à la requête sous `req.user`.
 * Sinon, il renvoie une erreur 401 (Accès refusé) ou 400 (Token invalide).
 *
 * @param {Object} req - Requête HTTP (contient l'en-tête 'Authorization' avec le token).
 * @param {Object} res - Réponse HTTP (utilisée pour renvoyer un message d'erreur si nécessaire).
 * @param {Function} next - Fonction de rappel pour passer à l'étape suivante du middleware.
 */
const verifyToken = (req, res, next) => {
  // Extraction du token JWT de l'en-tête 'Authorization'
  const token = req.header("Authorization");

  // Si aucun token n'est fourni, retourner une erreur 401 (Accès refusé)
  if (!token) return res.status(401).json({ message: "Accès refusé" });

  try {
    // Vérification du token à l'aide de la clé secrète et décodage du payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Ajouter les informations décodées du token à l'objet 'req' pour qu'elles soient accessibles dans la suite
    req.user = decoded;
    
    // Passer à l'étape suivante du middleware ou du gestionnaire de route
    next();
  } catch (err) {
    // Si une erreur survient pendant la vérification du token, retourner une erreur 400 (Token invalide)
    res.status(400).json({ message: "Token invalide" });
  }
};

// Exporter la fonction middleware pour qu'elle puisse être utilisée dans d'autres parties de l'application
module.exports = verifyToken;
