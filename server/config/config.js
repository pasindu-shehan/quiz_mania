const mysql = require("mysql2/promise");
require("dotenv").config();

const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: "",
  database: process.env.DATABASE,
});

module.exports = connection;
