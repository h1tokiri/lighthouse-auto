const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { addUser, getUserByEmail } = require("../db/queries/users");

// Register endpoint
router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !email || !password) {
    return res.status(400).json({ error: "First name, email and password are required" });
  }

  try {
    // Add user to database
    const userId = await addUser({ firstname, lastname, email, password });

    // Generate JWT token
    const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: process.env.JWT_EXPIRY || "24h",
    });

    res.status(201).json({
      token,
      user: { id: userId, firstname, lastname, email },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Get user from database
    const user = await getUserByEmail(email);

    // Check if user exists and password is correct
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: process.env.JWT_EXPIRY || "24h" }
    );

    // Return the correct user fields from the database
    res.json({
      token,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
