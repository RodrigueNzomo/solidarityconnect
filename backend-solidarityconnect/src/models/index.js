// Importation de Sequelize et de l'instance de connexion à la base de données
const { Sequelize } = require("sequelize");  
// Explication : Importe la classe Sequelize depuis le package `sequelize`. Cette classe permet de définir les modèles et d'interagir avec la base de données.
// Alternative : Si vous utilisez TypeScript, importez explicitement les types en utilisant des imports ES6 (`import { Sequelize } from "sequelize";`).

const sequelize = require("../config/database");  
// Explication : Importe l'instance de connexion à la base de données configurée dans le fichier `../config/database`. Cette instance encapsule la connexion MySQL.
// Alternative : Si vous travaillez avec plusieurs bases de données, envisagez de créer plusieurs instances de Sequelize et de les gérer séparément.

// Création d'un objet pour stocker l'instance Sequelize et l'instance de connexion
const db = {};
// Explication : Crée un objet vide qui servira de conteneur pour stocker les instances Sequelize et les modèles.
// Alternative : Utilisez un module comme `lodash` pour simplifier la gestion des objets complexes si nécessaire.

db.Sequelize = Sequelize;  
// Explication : Ajoute la classe Sequelize à l'objet `db` pour permettre un accès direct aux fonctionnalités de Sequelize dans d'autres parties de l'application.
// Alternative : Si vous n'avez pas besoin d'accéder directement à la classe Sequelize dans d'autres fichiers, cette ligne peut être omise.

db.sequelize = sequelize;  
// Explication : Ajoute l'instance de connexion à la base de données (définie dans `../config/database`) à l'objet `db`. Cela permet de centraliser l'accès à la connexion.
// Alternative : Si vous avez plusieurs bases de données, ajoutez chaque instance sous un nom spécifique (par exemple, `db.mysql`, `db.postgres`).

// Importation des modèles et leur association avec l'instance Sequelize
db.User = require("./User")(sequelize, Sequelize);  
// Explication : Importe le modèle `User` défini dans le fichier `./User` et l'associe à l'instance Sequelize (`sequelize`) et à la classe Sequelize (`Sequelize`).
// Alternative : Si vous avez plusieurs modèles, envisagez d'utiliser une boucle ou une fonction pour importer dynamiquement tous les modèles du dossier concerné.

// Exportation de l'objet 'db' pour permettre l'accès aux modèles dans d'autres fichiers de l'application
module.exports = db;
// Explication : Exporte l'objet `db` pour qu'il soit accessible dans d'autres fichiers de l'application. Cela centralise l'accès aux modèles et à l'instance Sequelize.
// Alternative : Si vous travaillez dans un projet TypeScript, utilisez des exports ES6 avec des types explicites pour améliorer la lisibilité (`export default db;`).