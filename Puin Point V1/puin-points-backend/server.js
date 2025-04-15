const mysql = require("mysql2");

const db = mysql.createConnection({
  host: 'p-studymysql02.fontysict.net',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection error:", err);
    return;
  }
  console.log("✅ MySQL connected");
});

module.exports = db; // zodat je 'm in je routes kunt gebruiken
