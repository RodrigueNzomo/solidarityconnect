const { Sequelize } = require("sequelize");
// Explication : Importe la classe Sequelize depuis le package sequelize.
// Alternative : Si vous utilisez TypeScript, envisagez d'utiliser des imports ES6 avec des types explicites.

require("dotenv").config();
// Explication : Charge les variables d'environnement depuis un fichier .env grâce à la bibliothèque dotenv.
// Alternative : Pour un environnement de production, préférez injecter directement les variables d'environnement via votre infrastructure (Docker, Kubernetes, etc.).

console.log("🔍 DEBUG - Vérification des variables d'environnement :", {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_PASSWORD: process.env.DB_PASSWORD ? "✅ Présent" : "❌ Manquant",
});
// Explication : Affiche un message de debug pour vérifier si les variables d'environnement nécessaires sont définies.
// Alternative : Lancez une exception ou arrêtez l'application si une variable essentielle est manquante pour éviter des erreurs lors du démarrage :
// if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_HOST) {
//   console.error("❌ Variables d'environnement manquantes !");
//   process.exit(1);
// }

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql", // Spécifie le type de base de données utilisé (ici MySQL).
    pool: {
      max: 10, // Nombre maximal de connexions dans le pool.
      min: 0, // Nombre minimal de connexions dans le pool.
      acquire: 30000, // Délai maximum en millisecondes avant d'abandonner l'acquisition d'une connexion.
      idle: 10000, // Durée maximale en millisecondes qu'une connexion peut rester inactive avant d'être libérée.
    },
    logging: process.env.NODE_ENV !== "production" ? console.log : false, // Active les logs SQL en dehors de l'environnement de production.
  }
);
// Explication : Crée une nouvelle instance de Sequelize pour gérer la connexion à la base de données MySQL.
// Alternative : Si vous utilisez une base de données différente, modifiez le paramètre `dialect` en conséquence (par exemple, "postgres", "mariadb", etc.).
// Conseil : Pour une meilleure gestion des pools de connexions, ajustez les paramètres selon les besoins réels de votre application.

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion MySQL réussie !");
    // Explication : Tente de se connecter à la base de données pour vérifier que les paramètres sont corrects.
    // Alternative : Vous pouvez ajouter des tests supplémentaires pour vérifier la connexion avant de continuer.

    await sequelize.sync({ alter: true });
    console.log("✅ Base de données synchronisée !");
    // Explication : Synchronise les modèles avec la base de données. L'option `{ alter: true }` met à jour automatiquement les tables existantes.
    // Alternative : En production, évitez `{ alter: true }` car cela peut entraîner des pertes de données ou des modifications non intentionnelles. Utilisez plutôt des migrations (Sequelize CLI).

  } catch (error) {
    console.error("❌ Erreur de connexion MySQL :", error);
    process.exit(1); // Termine l'application en cas d'erreur critique.
    // Explication : Gère les erreurs de connexion en affichant un message d'erreur détaillé et en arrêtant l'application.
    // Alternative : Implémentez une stratégie de reconnexion automatique si nécessaire.
  }
})();
// Explication : Fonction asynchrone auto-exécutée pour initialiser la connexion à la base de données.
// Alternative : Si vous avez plusieurs initialisations asynchrones, envisagez de regrouper ces opérations dans une fonction distincte.

module.exports = sequelize;
// Explication : Exporte l'instance de Sequelize pour permettre son utilisation dans d'autres modules.
// Alternative : Si vous utilisez TypeScript ou ES6, exportez explicitement avec `export default sequelize;`.