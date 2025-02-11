const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Accès refusé" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔐 Token valide pour l'utilisateur :", decoded.id);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ Erreur de token :", err);
    res.status(400).json({ message: "Token invalide" });
  }
};

module.exports = verifyToken;
