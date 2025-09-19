// backend/routes/studentRoutes.js
const express = require("express");
const router = express.Router();

// ✅ Dummy student profile
router.get("/profile", (req, res) => {
  res.json({
    name: "John Doe",
    email: "student@example.com",
    role: "student"
  });
});

// ✅ Dummy stats
router.get("/stats", (req, res) => {
  res.json({
    completed: 5,
    missed: 2,
    avgTime: "15 min"
  });
});

// ✅ Dummy calendar data
router.get("/calendar", (req, res) => {
  res.json({
    month: "September 2025",
    days: [
      { date: 1, status: "completed", tooltip: "Completed challenge" },
      { date: 2, status: "missed", tooltip: "Missed challenge" },
      { date: 3, status: "pending", tooltip: "Challenge pending" },
    ]
  });
});

module.exports = router;
