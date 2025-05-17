require('dotenv').config();

module.exports = {
  user: process.env.PGUSER || 'labber',
  password: process.env.PGPASSWORD || 'labber',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'lhautos', // <-- use lhautos here
  port: process.env.PGPORT || 5432,
};
