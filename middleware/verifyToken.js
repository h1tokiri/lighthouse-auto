const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Malformed token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    // Make sure this matches your JWT payload!
    req.user = decoded.id ? { id: decoded.id } : decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
