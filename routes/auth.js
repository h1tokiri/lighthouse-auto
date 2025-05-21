const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { addUser, getUserByEmail } = require("../db/queries/users");

// Register endpoint
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Add user to database
    const userId = await addUser({ name, email, password });

    // Generate JWT token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "24h",
    });

    res.json({
      token,
      user: { id: userId, name, email },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "24h",
    });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
