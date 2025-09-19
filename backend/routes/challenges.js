const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Middleware: authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalid" });
    req.user = user;
    next();
  });
};

// ===== GET today's challenge =====
router.get("/today", authenticateToken, async (req, res) => {
  try {
    // Example challenge data; replace with DB query if needed
    const challenge = {
      title: "Reverse a String",
      description: "Write a function to reverse a string in JavaScript.",
      difficulty: "Easy",
      estimatedTime: 10, // in minutes
    };
    res.json(challenge);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
