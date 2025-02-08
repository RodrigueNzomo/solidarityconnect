require("dotenv").config();
// Explication : Charge les variables d'environnement depuis le fichier `.env` grâce à la bibliothèque `dotenv`.
// Alternative : Si vous travaillez dans un environnement de production, envisagez d'utiliser des variables d'environnement injectées directement par votre infrastructure (par exemple, Docker, Kubernetes) plutôt que de dépendre d'un fichier `.env`.

console.log("🔍 DEBUG - Chargement des variables d'environnement :");
["DB_NAME", "DB_USER", "DB_HOST", "DB_PORT", "PORT", "JWT_SECRET"].forEach((key) => {
  console.log(`  - ${key}: ${process.env[key] ? "✅ Présent" : "❌ Manquant"}`);
});
// Explication : Affiche un message de debug pour vérifier si les variables d'environnement nécessaires sont présentes.
// Alternative : Pour une meilleure gestion des erreurs, lancez une exception ou arrêtez l'application si une variable essentielle est manquante :
// if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_HOST) {
//   console.error("❌ Variables d'environnement manquantes !");
//   process.exit(1);
// }

const express = require("express");
const cors = require("cors");
// Explication : Importe les bibliothèques Express (framework web) et CORS (gestion des requêtes cross-origin).
// Alternative : Si vous n'avez pas besoin de gérer les requêtes cross-origin, vous pouvez omettre `cors`.

const db = require("./src/config/database");
const routes = require("./src/routes/authRoutes");
const errorHandler = require("./src/middlewares/errorHandler");
// Explication : Importe les modules personnalisés pour la configuration de la base de données, les routes d'authentification et la gestion des erreurs.
// Alternative : Pour une meilleure modularité, regroupez vos routes dans un router principal et utilisez des middlewares spécifiques pour chaque groupe de routes.

const app = express();
// Explication : Crée une instance de l'application Express.
// Alternative : Aucune alternative significative ici, car c'est une pratique standard.

app.use(express.json());
// Explication : Active le middleware JSON d'Express pour parser les corps des requêtes en format JSON.
// Alternative : Si vous prévoyez de recevoir des formulaires encodés (`application/x-www-form-urlencoded`), ajoutez également `express.urlencoded({ extended: true })`.

app.use(cors());
// Explication : Active le middleware CORS pour autoriser les requêtes provenant d'autres origines.
// Alternative : Configurez CORS avec des options plus strictes si nécessaire, par exemple :
// app.use(cors({
//   origin: "https://votre-domaine.com",
//   methods: ["GET", "POST"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

app.use("/api", routes);
// Explication : Définit le préfixe `/api` pour toutes les routes définies dans `authRoutes`.
// Alternative : Utilisez un routeur principal pour organiser vos routes par fonctionnalités :
// const apiRouter = require("./src/routes/apiRouter");
// app.use("/api", apiRouter);

app.use(errorHandler);
// Explication : Applique le middleware de gestion des erreurs pour capturer et traiter les erreurs non gérées.
// Alternative : Assurez-vous que ce middleware est toujours défini en dernier pour intercepter toutes les erreurs.

(async () => {
  try {
    await db.authenticate();
    console.log("✅ Connexion MySQL réussie !");
    await db.sync();
    console.log("✅ Base de données synchronisée !");
  } catch (error) {
    console.error("❌ Erreur de connexion MySQL :", error);
    process.exit(1); // Arrête l'application en cas d'erreur critique.
  }
})();
// Explication : Tente de se connecter à la base de données MySQL et de synchroniser les modèles. En cas d'échec, affiche une erreur et termine l'application.
// Alternative : Ajoutez une option pour ignorer la synchronisation automatique si elle n'est pas nécessaire (par exemple, dans un environnement de production) :
// await db.sync({ alter: false }); // Ne modifie pas la structure existante.
// Route de test pour vérifier si le backend fonctionne
app.get('/', (req, res) => {
  res.send('🚀 Backend SolidarityConnect fonctionne !');
});
const PORT = process.env.PORT || 5000;
// Explication : Lit le port depuis les variables d'environnement ou utilise 5000 comme valeur par défaut.
// Alternative : Si vous utilisez un gestionnaire de processus comme PM2, laissez le port être défini dynamiquement.

app.listen(PORT, () => {
  console.log(`🚀 Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
// Explication : Démarre le serveur Express sur le port spécifié.
// Alternative : Pour une meilleure intégration avec des systèmes de déploiement, considérez l'utilisation d'un fichier de démarrage séparé ou d'un gestionnaire de processus comme PM2.