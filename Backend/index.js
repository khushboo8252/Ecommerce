const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/config");

const User = require("./db/User");
const Product = require("./db/Product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const jwtKey = process.env.JWT_SECRET || "e-comm"; // use env variable in production

app.use(express.json());
app.use(cors());

// ======== User Registration ========
app.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).send("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, name, password: hashedPassword });
    let result = await user.save();
    result = result.toObject();
    delete result.password;

    jwt.sign({ id: result._id }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) return res.status(500).send({ result: "Token error" });
      res.send({ result, auth: token });
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// ======== User Login ========
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ result: "No user found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send({ result: "Invalid password" });

    const userWithoutPass = user.toObject();
    delete userWithoutPass.password;

    jwt.sign({ id: user._id }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) return res.status(500).send({ result: "Token error" });
      res.send({ user: userWithoutPass, auth: token });
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// ======== Add Product ========
app.post("/add-product", async (req, res) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
  } catch (err) {
    res.status(500).send("Error adding product");
  }
});

// ======== Get All Products ========
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.send(products.length ? products : { result: "No product found" });
});

// ======== Delete Product ========
app.delete("/products/:id", async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

// ======== Get Product By ID (for update) ========
app.get("/products/:id", async (req, res) => {
  const result = await Product.findOne({ _id: req.params.id });
  res.send(result || { result: "No record found." });
});

// ======== Update Product ========
app.put("/products/:id", async (req, res) => {
  const result = await Product.updateOne({ _id: req.params.id }, { $set: req.body });
  res.send(result);
});

// ======== Search Products ========
app.get("/search/:key", async (req, res) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: req.params.key, $options: "i" } },
      { price: { $regex: req.params.key, $options: "i" } },
      { category: { $regex: req.params.key, $options: "i" } },
      { company: { $regex: req.params.key, $options: "i" } },
    ],
  });
  res.send(result);
});

// ======== Start Server ========
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
