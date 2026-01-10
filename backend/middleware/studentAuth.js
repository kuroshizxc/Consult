// backend/middleware/studentAuth.js
const jwt = require("jsonwebtoken");

function studentAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // expects "Bearer <token>"
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.student = decoded; // attach decoded payload to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = studentAuth;