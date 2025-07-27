const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//Routes
app.use("/", require("./routes/upload"));
app.use("/auth", require("./routes/auth"));
app.use("/products", require("./routes/product"));
app.use("/cart", require("./routes/cart"));
app.use("/payment", require("./routes/payment"));

module.exports = app;