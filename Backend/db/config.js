const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGODB_URL;

if (!uri) {
  console.error("❌ MONGODB_URL is not defined in your .env file");
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // optional: exit process if connection fails
  });
