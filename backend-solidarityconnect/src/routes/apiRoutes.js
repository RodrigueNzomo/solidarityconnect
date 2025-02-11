const express = require("express");
const router = express.Router();

// 📌 Importation des sous-routeurs
const authRoutes = require("./authRoutes"); // Authentification
const userRoutes = require("./userRoutes"); // Gestion des utilisateurs
const helpRequestRoutes = require("./helpRequestRoutes"); // Demandes d'aides
const volunteerRoutes = require("./volunteerRoutes"); // Gestion des bénévoles
const messageRoutes = require("./messageRoutes"); // Messagerie
const adminRoutes = require("./adminRoutes"); // Administration

// Vérification de l'importation correcte
if (!helpRequestRoutes) {
  console.error("❌ ERREUR: Impossible de charger les routes helpRequestRoutes !");
  process.exit(1);
}
// 📌 Définition du préfixe `/api`
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/help-requests", helpRequestRoutes);
router.use("/volunteers", volunteerRoutes);
router.use("/messages", messageRoutes);
router.use("/admin", adminRoutes);

// 📌 Route de test pour voir si l'API fonctionne
router.get("/", (req, res) => {
  res.json({ message: "🚀 API SolidarityConnect en ligne !" });
});

module.exports = router;
