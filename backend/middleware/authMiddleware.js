const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Authenticate any logged-in user
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token, authorization denied" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }
    next();
  } catch (err) {
    console.error("AuthMiddleware Error:", err.message);
    res.status(401).json({ success: false, message: "Token is not valid" });
  }
};

// Role-based middlewares
const facultyOnly = (req, res, next) => {
  if (req.user.role !== "faculty") {
    return res.status(403).json({ success: false, message: "Access denied (Faculty only)" });
  }
  next();
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Access denied (Admin only)" });
  }
  next();
};

module.exports = { authMiddleware, facultyOnly, adminOnly };
