const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // ensures no duplicate emails
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // optional: minimum password length
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.model("User", userSchema);
