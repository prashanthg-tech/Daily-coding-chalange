const express = require("express");
const { getAdminDashboard } = require("../controllers/adminController");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   GET /api/admin/dashboard
router.get("/dashboard", authMiddleware, adminOnly, getAdminDashboard);

module.exports = router;
