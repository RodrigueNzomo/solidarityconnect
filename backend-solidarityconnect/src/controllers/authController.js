// Importation des bibliothèques nécessaires
const bcrypt = require("bcryptjs");  
// Explication : Bibliothèque utilisée pour hacher les mots de passe avant leur stockage en base de données.
// Alternative : Si vous préférez une bibliothèque plus légère, envisagez `argon2`, qui est également recommandée pour le hachage sécurisé.

const jwt = require("jsonwebtoken"); 
// Explication : Bibliothèque pour la gestion des JSON Web Tokens (JWT), utilisée ici pour générer des tokens d'authentification.
// Alternative : Pour une meilleure sécurité, utilisez des bibliothèques comme `jsonwebtoken` avec des options de cryptage renforcé ou explorez des solutions basées sur OAuth 2.0 si nécessaire.

const db = require("../models");    
// Explication : Importe les modèles Sequelize définis dans le dossier `../models`. Ces modèles représentent les tables de la base de données.
// Alternative : Si vous travaillez dans un projet TypeScript, utilisez des imports ES6 avec des types explicites pour améliorer la lisibilité.

/**
 * Fonction de gestion de l'enregistrement d'un nouvel utilisateur.
 * Cette fonction hache le mot de passe de l'utilisateur avant de l'enregistrer dans la base de données.
 *
 * @param {Object} req - Requête HTTP contenant les données de l'utilisateur.
 * @param {Object} res - Réponse HTTP pour envoyer les résultats de l'enregistrement.
 */
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;  
    // Explication : Extraction des données d'enregistrement depuis le corps de la requête HTTP.
    // Alternative : Ajoutez une validation des données d'entrée (par exemple, avec Joi ou Celebrate) pour garantir que les champs sont valides avant traitement.

    // Hachage du mot de passe avant de l'enregistrer pour plus de sécurité
    const hashedPassword = await bcrypt.hash(password, 10);
    // Explication : Le mot de passe est haché avec 10 rounds de salage pour garantir sa sécurité.
    // Alternative : Augmentez le nombre de rounds (par exemple, à 12) pour renforcer encore davantage la sécurité, bien que cela augmente aussi le temps de calcul.

    // Création du nouvel utilisateur dans la base de données
    const newUser = await db.User.create({ username, email, password: hashedPassword });
    // Explication : Un nouvel utilisateur est créé dans la base de données avec les informations fournies, y compris le mot de passe haché.
    // Alternative : Implémentez des validations au niveau du modèle Sequelize pour éviter les doublons (par exemple, contraintes d'unicité sur l'email).

    // Réponse indiquant que l'utilisateur a été créé avec succès
    res.status(201).json({ message: "Utilisateur créé", user: newUser });
    // Explication : Une réponse HTTP 201 (Created) est envoyée avec les détails du nouvel utilisateur.
    // Alternative : Ne retournez pas toutes les informations sensibles de l'utilisateur (par exemple, excluez le mot de passe haché).

  } catch (error) {
    // Gestion des erreurs serveur
    res.status(500).json({ message: "Erreur serveur", error });
    // Explication : En cas d'erreur lors de l'enregistrement, une réponse HTTP 500 (Internal Server Error) est renvoyée avec un message d'erreur.
    // Alternative : Journalisez l'erreur pour faciliter le débogage tout en renvoyant uniquement un message générique à l'utilisateur final.
  }
};

/**
 * Fonction de gestion de la connexion d'un utilisateur.
 * Cette fonction vérifie si l'utilisateur existe et si le mot de passe est correct.
 * Si c'est le cas, elle génère un token JWT pour l'utilisateur.
 *
 * @param {Object} req - Requête HTTP contenant les informations de connexion (email, mot de passe).
 * @param {Object} res - Réponse HTTP pour envoyer le résultat de la tentative de connexion.
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;  
    // Explication : Extraction des informations de connexion depuis le corps de la requête HTTP.
    // Alternative : Validez les données d'entrée pour s'assurer qu'elles respectent les critères requis (par exemple, format d'email valide).

    // Recherche de l'utilisateur dans la base de données par son email
    const user = await db.User.findOne({ where: { email } });
    // Explication : Recherche de l'utilisateur correspondant à l'email fourni dans la base de données.
    // Alternative : Utilisez des index sur la colonne `email` pour améliorer les performances des recherches.

    // Si l'utilisateur n'existe pas, retour d'une erreur 404
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    // Explication : Si aucun utilisateur n'est trouvé, une réponse HTTP 404 (Not Found) est renvoyée.
    // Alternative : Retournez un code 401 (Unauthorized) pour masquer l'existence ou non de l'utilisateur.

    // Vérification si le mot de passe fourni correspond au mot de passe haché dans la base de données
    const isMatch = await bcrypt.compare(password, user.password);
    // Explication : La méthode `compare` vérifie si le mot de passe fourni correspond au hash stocké en base de données.
    // Alternative : Si vous utilisez une autre bibliothèque de hachage, adaptez cette étape en conséquence.

    if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });
    // Explication : Si les mots de passe ne correspondent pas, une réponse HTTP 400 (Bad Request) est renvoyée.
    // Alternative : Comme ci-dessus, retournez plutôt un code 401 pour masquer l'erreur spécifique.

    // Création d'un token JWT valide pendant 1 jour
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    // Explication : Un token JWT est généré avec une durée de validité de 1 jour, contenant l'ID de l'utilisateur.
    // Alternative : Considérez l'utilisation de tokens rafraîchissants (refresh tokens) pour prolonger la session sans compromettre la sécurité.

    // Réponse avec le token JWT généré
    res.json({ message: "Connexion réussie", token });
    // Explication : Une réponse HTTP 200 (OK) est renvoyée avec le token JWT généré.
    // Alternative : Incluez d'autres informations utiles dans la réponse si nécessaire, mais évitez les données sensibles.

  } catch (error) {
    // Gestion des erreurs serveur
    res.status(500).json({ message: "Erreur serveur", error });
    // Explication : En cas d'erreur lors de la tentative de connexion, une réponse HTTP 500 (Internal Server Error) est renvoyée avec un message d'erreur.
    // Alternative : Journalisez l'erreur pour faciliter le débogage tout en renvoyant uniquement un message générique à l'utilisateur final.
  }
};