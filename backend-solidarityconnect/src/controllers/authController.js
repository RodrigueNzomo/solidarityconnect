require("dotenv").config(); // Chargement des variables d'environnement
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");

// Vérifier que `db.User` est bien défini avant de l'utiliser
if (!db || !db.User) {
  console.error("❌ Erreur critique : `db.User` est introuvable. Vérifiez l'importation des modèles.");
  process.exit(1);
}

// ✅ Fonction d'inscription
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, birthDate, gender, maritalStatus, childrenCount, email, phone, address, job, userRole, password } = req.body;
    
    console.log("📝 Tentative d'inscription :", email);

    if (!password) {
      return res.status(400).json({ message: "Le mot de passe est requis" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 FORCER le rôle de chaque utilisateur à "user" lors de l'inscription
    const newUser = await db.User.create({
      firstName,
      lastName,
      birthDate,
      gender,
      maritalStatus,
      childrenCount,
      email,
      phone,
      address,
      job,
      userRole,
      password: hashedPassword,
      role: "user", // 🟢 Ajout du rôle "user" par défaut
    });

    res.status(201).json({ message: "Utilisateur créé", user: newUser });
  } catch (error) {
    console.error("❌ Erreur d'inscription :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ✅ Fonction de connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔑 Tentative de connexion :", email);

    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe sont requis" });
    }

    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" }); // 🔹 Ajout du rôle dans le token
    res.json({ message: "Connexion réussie", token });
  } catch (error) {
    console.error("❌ Erreur de connexion :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ✅ Fonction pour récupérer le profil utilisateur
exports.getProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    console.log("👤 Récupération du profil :", req.user.id);

    const user = await db.User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "Profil non trouvé" });
    }

    res.json(user);
  } catch (error) {
    console.error("❌ Erreur récupération du profil :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ✅ Fonction pour rafraîchir le token JWT
exports.refreshToken = (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    const token = jwt.sign({ id: req.user.id, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (error) {
    console.error("❌ Erreur refresh token :", error);
    res.status(500).json({ message: "Erreur lors du rafraîchissement du token" });
  }
};
