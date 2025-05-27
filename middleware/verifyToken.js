const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("Auth header:", authHeader); // Log for debugging

  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Malformed token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    console.log("Decoded token:", decoded); // Log decoded token

    // The key issue: match your database column names
    req.user = {
      id: decoded.id || decoded.userId, // Handle both formats
      email: decoded.email,
    };

    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(401).json({ error: "Invalid token" });
  }
};
