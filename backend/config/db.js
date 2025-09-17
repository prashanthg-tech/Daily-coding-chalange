const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "dailyCoding", // ✅ use fixed DB name
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // stop server if DB fails
  }
};

/* ----------------- Mongoose Connection Events ----------------- */
mongoose.connection.on("connected", () => {
  console.log("📡 Mongoose connected to DB");
});

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("⚠️ MongoDB connection error:", err.message);
});

/* ----------------- Graceful Shutdown ----------------- */
const gracefulExit = async (signal) => {
  try {
    await mongoose.connection.close();
    console.log(`🛑 MongoDB connection closed due to app termination (${signal})`);
    process.exit(0);
  } catch (err) {
    console.error("Error during MongoDB shutdown:", err.message);
    process.exit(1);
  }
};

process.on("SIGINT", () => gracefulExit("SIGINT"));
process.on("SIGTERM", () => gracefulExit("SIGTERM"));

module.exports = connectDB;
