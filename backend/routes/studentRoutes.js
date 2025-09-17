const express = require("express");
const { getStudentDashboard } = require("../controllers/studentController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   GET /api/student/dashboard
router.get("/dashboard", authMiddleware, getStudentDashboard);

module.exports = router;
console.log("authMiddleware:", typeof authMiddleware);
console.log("getStudentDashboard:", typeof getStudentDashboard);
