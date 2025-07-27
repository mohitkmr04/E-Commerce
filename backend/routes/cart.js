const express = require("express");
const router = express.Router();
const {
    addToCart,
    removeFromCart,
    getCartData
} = require("../controllers/cartController");

const fetchUser = require("../middleware/fetchUser");

// Add product to cart
router.post("/add", fetchUser, addToCart);

// Remove product from cart
router.post("/remove", fetchUser, removeFromCart);

// Get user's cart data
router.post("/get", fetchUser, getCartData);

module.exports = router;