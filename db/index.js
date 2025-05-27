const { Pool } = require('pg');
const dbParams = require('../lib/db.js'); // or your config file
const pool = new Pool(dbParams);
const db = require('../db'); // This should point to your db/index.js

module.exports = {
  query: (text, params) => pool.query(text, params),
};
