const express = require("express");
const { registerUser, loginUser, getMe } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   POST /api/auth/register
router.post("/register", registerUser);

// @route   POST /api/auth/login
router.post("/login", loginUser);

// @route   GET /api/auth/profile
router.get("/profile", authMiddleware, getMe);

module.exports = router;
