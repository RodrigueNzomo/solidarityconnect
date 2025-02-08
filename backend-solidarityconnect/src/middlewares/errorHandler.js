/**
 * Middleware global de gestion des erreurs pour Express.
 * Il intercepte toutes les erreurs non gérées et envoie une réponse JSON appropriée.
 *
 * @param {Object} err - L'objet erreur capturé (contient des informations sur l'erreur).
 * @param {Object} req - L'objet de requête Express (utilisé si nécessaire pour contextualiser l'erreur).
 * @param {Object} res - L'objet de réponse Express (utilisé pour renvoyer une réponse appropriée à l'utilisateur).
 * @param {Function} next - La fonction de passage au middleware suivant (normalement inutilisée ici car c'est un middleware d'erreur final).
 */
const errorHandler = (err, req, res, next) => {
  console.error("❌ ERREUR SERVEUR :", err); 
  // Explication : Journalise l'erreur dans la console pour faciliter le débogage.
  // Alternative : Utilisez un système de journalisation plus robuste comme `winston` ou `pino` pour gérer les logs de manière centralisée et configurable.

  // Définir le code d'état HTTP (500 si non défini)
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  // Explication : Si un code d'état a déjà été défini (par exemple, par un middleware précédent), il est conservé. Sinon, un code 500 (Internal Server Error) est utilisé par défaut.
  // Alternative : Implémentez une logique plus granulaire pour attribuer des codes d'état spécifiques selon le type d'erreur (par exemple, 400 pour des erreurs liées aux données).

  res.status(statusCode).json({
    success: false, 
    // Explication : Indique que la requête a échoué. Cela peut être utile pour les clients qui analysent les réponses JSON.
    // Alternative : Vous pouvez ajouter des propriétés supplémentaires pour fournir plus de contexte (par exemple, `errorType` ou `errorCode`).

    message: err.message || "Erreur interne du serveur", 
    // Explication : Renvoie un message d'erreur spécifique s'il est disponible, sinon un message générique est utilisé.
    // Alternative : Pour des raisons de sécurité, évitez de retourner des messages d'erreur trop détaillés en production. Utilisez plutôt des messages génériques comme "Une erreur est survenue".

    stack: process.env.NODE_ENV === "production" ? null : err.stack, 
    // Explication : Inclut le stack trace de l'erreur uniquement en environnement de développement pour faciliter le débogage. En production, cela est masqué pour des raisons de sécurité.
    // Alternative : Vous pouvez configurer un endpoint administratif sécurisé pour afficher les stacks d'erreurs en production si nécessaire.
  });
};

// Exporter le middleware pour qu'il puisse être utilisé dans l'application Express
module.exports = errorHandler;
// Explication : Le middleware `errorHandler` est exporté pour être utilisé comme dernier middleware dans l'application Express.
// Alternative : Si vous avez plusieurs middlewares similaires, regroupez-les dans un fichier unique pour une meilleure organisation.