const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

// ✅ Load environment variables
require("dotenv").config({ path: path.join(__dirname, ".env") });

// Debug: show if MONGO_URI is loaded
console.log("MONGO_URI from env:", process.env.MONGO_URI);

const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const adminRoutes = require("./routes/adminRoutes");

// <-- Import challenges route -->
const challengesRoutes = require("./routes/challenges");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", // safer in production
    credentials: true,
  })
);
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev")); // logs requests in dev
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/faculty", facultyRoutes);
app.use("/api/admin", adminRoutes);

// <-- Mount the challenges route -->
app.use("/api/challenges", challengesRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "✅ OK",
    service: "Daily Coding API",
    environment: process.env.NODE_ENV || "development",
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack || err.message);
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Something went wrong!",
  });
});

// Start server only after DB connection
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

// Graceful shutdown
const shutdown = () => {
  console.log("🛑 Server shutting down...");
  process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
