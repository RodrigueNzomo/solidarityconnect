const bcrypt = require("bcrypt");

async function hashPasswords() {
  const passwords = [
    "password123",
    "securepass",
    "mysecret1",
    "letmein",
    "hello123",
    "adminpass",
    "qwerty",
    "monkey",
    "sunshine",
    "football"
  ];

  for (const password of passwords) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(`"${password}" → "${hashedPassword}"`);
  }
}

hashPasswords();
