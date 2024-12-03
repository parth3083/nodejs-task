const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((error) => {
  if (error) {
    console.log("Error in connecting to the database: ", error);
    process.exit(1);
  } else {
    console.log("Connected to the database!");
  }
});

module.exports = db;
