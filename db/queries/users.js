const db = require("../connection");
const bcrypt = require("bcrypt");

// User database queries
const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => data.rows);
};

const getUserByEmail = (email) => {
  return db.query("SELECT * FROM users WHERE email = $1;", [email]).then((data) => data.rows[0]);
};

const addUser = async (user) => {
  try {
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Changed first_name to name to match your database schema
    const result = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
      [user.name, user.email, hashedPassword]
    );

    return result.rows[0].id;
  } catch (err) {
    // Check for duplicate email error
    if (err.code === "23505" && err.constraint === "users_email_key") {
      throw new Error("Email already in use");
    }
    throw err;
  }
};

module.exports = {
  getUsers,
  getUserByEmail,
  addUser,
};
