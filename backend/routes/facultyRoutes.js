const express = require("express");
const { getFacultyDashboard } = require("../controllers/facultyController");
const { authMiddleware, facultyOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   GET /api/faculty/dashboard
router.get("/dashboard", authMiddleware, facultyOnly, getFacultyDashboard);

module.exports = router;
