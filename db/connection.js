// PG database client/connection setup
const { Pool } = require("pg");

const dbParams = {
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // database: process.env.DB_NAME,
  connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : null,
};

const db = new Pool(dbParams);

module.exports = db;
