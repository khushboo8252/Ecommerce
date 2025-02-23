
const mongoose = require("mongoose");
require("dotenv").config();
const uri =process.env.MONGODB_URL

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("Could not connect", err);
  });
