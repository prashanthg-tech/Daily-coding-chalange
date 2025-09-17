const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

console.log("✅ Loaded ENV keys:", Object.keys(process.env));
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("PORT:", process.env.PORT);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
