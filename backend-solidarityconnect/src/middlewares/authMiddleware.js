// Importation de la bibliothèque jsonwebtoken pour vérifier le token JWT
const jwt = require("jsonwebtoken");
// Explication : La bibliothèque `jsonwebtoken` est utilisée pour valider et décoder les tokens JWT.
// Alternative : Si vous travaillez dans un environnement nécessitant une sécurité renforcée, envisagez d'utiliser des bibliothèques comme `jose` ou `express-jwt` qui offrent des fonctionnalités supplémentaires.

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
  // Explication : Le token est normalement fourni dans l'en-tête `Authorization` sous la forme "Bearer <token>".
  // Alternative : Si le token est transmis via un cookie ou un autre moyen, ajustez cette ligne pour extraire correctement le token.

  // Si aucun token n'est fourni, retourner une erreur 401 (Accès refusé)
  if (!token) return res.status(401).json({ message: "Accès refusé" });
  // Explication : Une réponse HTTP 401 (Unauthorized) est renvoyée si aucun token n'est présent dans l'en-tête.
  // Alternative : Vous pouvez également renvoyer un code 403 (Forbidden) si cela correspond mieux à votre politique de sécurité.

  try {
    // Vérification du token à l'aide de la clé secrète et décodage du payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Explication : La méthode `jwt.verify` vérifie si le token est valide en utilisant la clé secrète définie dans les variables d'environnement.
    // Alternative : Pour une meilleure gestion des erreurs, capturez spécifiquement les types d'erreurs possibles (par exemple, Token expiré, Signature invalide).

    // Ajouter les informations décodées du token à l'objet 'req' pour qu'elles soient accessibles dans la suite
    req.user = decoded;
    // Explication : Les informations décodées (payload) sont ajoutées à l'objet `req` sous la propriété `user`, facilitant leur accès dans les routes suivantes.
    // Alternative : Si vous utilisez TypeScript, définissez explicitement le type de `req.user` pour améliorer la lisibilité et éviter les erreurs.

    // Passer à l'étape suivante du middleware ou du gestionnaire de route
    next();
    // Explication : La fonction `next()` permet de continuer le traitement de la requête en passant à l'étape suivante du middleware ou au gestionnaire de route.
    // Alternative : Aucune alternative significative ici, car c'est une pratique standard pour les middlewares Express.

  } catch (err) {
    // Si une erreur survient pendant la vérification du token, retourner une erreur 400 (Token invalide)
    res.status(400).json({ message: "Token invalide" });
    // Explication : Une réponse HTTP 400 (Bad Request) est renvoyée si le token est invalide ou a expiré.
    // Alternative : Retournez un code 401 (Unauthorized) pour masquer les détails spécifiques liés à l'invalidité du token.
  }
};

// Exporter la fonction middleware pour qu'elle puisse être utilisée dans d'autres parties de l'application
module.exports = verifyToken;
// Explication : Le middleware `verifyToken` est exporté pour être utilisé dans d'autres fichiers de l'application, notamment dans les routes protégées.
// Alternative : Si vous avez plusieurs middlewares similaires, regroupez-les dans un fichier unique pour une meilleure organisation.