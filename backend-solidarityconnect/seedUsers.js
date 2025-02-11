const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require('bcryptjs');


const sequelize = new Sequelize("SolidarityConnect_DB", "root", "Local123!", {
  host: "127.0.0.1",
  dialect: "mysql"
});

const User = require("./src/models/User")(sequelize, DataTypes);

async function seedUsers() {
  await sequelize.sync({ force: true }); // Supprime et recrée la table

  const users = [
    { firstName: "Yvon", lastName: "Mensah", username: "yvon_mensah", email: "yvonmensah22@gmail.com", phone: "678901234", address: "Rue des Lilas, Paris", specialty: "Développeur", password: "password123", role: "user" },
    { firstName: "Warda", lastName: "Boubaker", username: "warda_boubaker", email: "wardaboubaker94@gmail.com", phone: "654321987", address: "Avenue de la Paix, Lyon", specialty: "Data Analyst", password: "securepass", role: "moderator" }
  ];

  for (const user of users) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }

  await User.bulkCreate(users);
  console.log("Utilisateurs insérés avec succès !");
  process.exit();
}

seedUsers();
