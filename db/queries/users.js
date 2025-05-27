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
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Generate a username based on email (or firstname+lastname)
    const username = user.username || `${user.email.split("@")[0]}_${Date.now().toString(36)}`;

    const result = await db.query(
      "INSERT INTO users (firstname, lastname, email, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [user.firstname, user.lastname || "", user.email, username, hashedPassword]
    );

    return result.rows[0].id;
  } catch (err) {
    // Error handling
    if (err.code === "23505" && err.constraint === "users_email_key") {
      throw new Error("Email already in use");
    }
    if (err.code === "23505" && err.constraint === "users_username_key") {
      throw new Error("Username already in use");
    }
    throw err;
  }
};
module.exports = {
  getUsers,
  getUserByEmail,
  addUser,
};
