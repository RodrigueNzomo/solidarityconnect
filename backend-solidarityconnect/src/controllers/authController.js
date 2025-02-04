// Importation des bibliothèques nécessaires
const bcrypt = require("bcryptjs");  // Pour le hachage du mot de passe
const jwt = require("jsonwebtoken"); // Pour la gestion des JSON Web Tokens (JWT)
const db = require("../models");    // Importation des modèles Sequelize

/**
 * Fonction de gestion de l'enregistrement d'un nouvel utilisateur.
 * Cette fonction hache le mot de passe de l'utilisateur avant de l'enregistrer dans la base de données.
 *
 * @param {Object} req - Requête HTTP contenant les données de l'utilisateur.
 * @param {Object} res - Réponse HTTP pour envoyer les résultats de l'enregistrement.
 */
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;  // Récupération des informations de l'utilisateur depuis la requête
    
    // Hachage du mot de passe avant de l'enregistrer pour plus de sécurité
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du nouvel utilisateur dans la base de données
    const newUser = await db.User.create({ username, email, password: hashedPassword });

    // Réponse indiquant que l'utilisateur a été créé avec succès
    res.status(201).json({ message: "Utilisateur créé", user: newUser });
  } catch (error) {
    // Gestion des erreurs serveur
    res.status(500).json({ message: "Erreur serveur", error });
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
    const { email, password } = req.body;  // Récupération des informations de connexion de la requête
    
    // Recherche de l'utilisateur dans la base de données par son email
    const user = await db.User.findOne({ where: { email } });

    // Si l'utilisateur n'existe pas, retour d'une erreur 404
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    // Vérification si le mot de passe fourni correspond au mot de passe haché dans la base de données
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

    // Création d'un token JWT valide pendant 1 jour
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Réponse avec le token JWT généré
    res.json({ message: "Connexion réussie", token });
  } catch (error) {
    // Gestion des erreurs serveur
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
