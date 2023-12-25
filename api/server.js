require("dotenv").config();
require("./dbConnectioin/mainconnection");
const bodyParser = require("body-parser");
const User = require("./dbConnectioin/User");
const Cart = require("./dbConnectioin/Cart");
const Product = require("./dbConnectioin/Product");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
const user = require('./Router/user')
const cart = require('./Router/ordercollection')
const product = require("./Router/product")

app.get("/", (req, res) => {
  res.send("welcome to our project");
});

app.use("/user",user)
app.use("/cart",cart)
app.use("/product",product)

app.listen(port, () => {
  console.log(`Server connected on http://localhost:${port}`);
});
