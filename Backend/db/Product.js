const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming there’s a User model
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
}, {
  timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.model("Product", productSchema);
