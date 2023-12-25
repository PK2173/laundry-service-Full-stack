const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  }, 
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  products: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
