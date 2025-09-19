const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const connectDB = require("../config/db");

// Import routes
const authRoutes = require("../routes/authRoutes");
const studentRoutes = require("../routes/studentRoutes");
const facultyRoutes = require("../routes/facultyRoutes");
const adminRoutes = require("../routes/adminRoutes");
const challengeRoutes = require("../routes/challenges");

// ✅ Create app first
const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/questions", challengeRoutes);  // ✅ fixed typo

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "✅ OK",
    service: "Daily Coding API",
    environment: process.env.NODE_ENV || "development",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack || err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong!",
  });
});

// Start server after DB connection
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Failed to connect to DB", err.message);
    process.exit(1);
  }
};

startServer();
