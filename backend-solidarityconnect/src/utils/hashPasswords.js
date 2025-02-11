const bcrypt = require("bcryptjs");
const fs = require("fs");

const users = [
  { firstName: "Yvon", lastName: "Mensah", email: "yvonmensah22@gmail.com", password: "abcd" },
  { firstName: "Warda", lastName: "Boubaker", email: "wardaboubaker94@gmail.com", password: "abcd" },
  { firstName: "Sidonie", lastName: "Djuissi", email: "sidoniedjuissifohouo@gmail.com", password: "abcd" },
  { firstName: "Rodrigue", lastName: "Nzomo", email: "nzomo@example.com", password: "abcd" },
  { firstName: "François", lastName: "Nsengimana", email: "francknsengimana@gmail.com", password: "abcd" },
  { firstName: "Moussa", lastName: "Tamba", email: "tambamoussa@gmail.com", password: "abcd" },
  { firstName: "Jovy", lastName: "Monka", email: "jovy_monka7@gmail.com", password: "abcd" },
  { firstName: "Jalil", lastName: "Fonda", email: "fondajalil@gmail.com", password: "abcd" },
  { firstName: "Hothia", lastName: "Diao", email: "hothia@example.com", password: "abcd" },
  { firstName: "Fatima", lastName: "Diallo", email: "fatima@example.com", password: "abcd" },
];

async function hashPasswords() {
  let sqlQueries = "";
  
  for (const user of users) {
    user.hashedPassword = await bcrypt.hash(user.password, 10);
    const sqlQuery = `INSERT INTO Users (firstName, lastName, email, password, role) 
                      VALUES ('${user.firstName}', '${user.lastName}', '${user.email}', '${user.hashedPassword}', 'user');\n`;
    sqlQueries += sqlQuery;
    console.log(sqlQuery);
  }

  // Enregistrer les commandes SQL dans un fichier
  fs.writeFileSync("insert_users.sql", sqlQueries);
  console.log("✅ Fichier insert_users.sql généré avec succès !");
}

hashPasswords();
