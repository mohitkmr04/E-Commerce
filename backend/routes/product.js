const express = require("express");
const router = express.Router();
const {addProduct, removeProduct, getAllProducts, getNewCollection, getPopularInWomen, getRelatedProducts} = require("../controllers/productController");

// Add a new product
router.post("/add", addProduct);

// Remove a product by ID
router.post("/remove", removeProduct);

// Get all products
router.get("/all", getAllProducts);

// Get new collection (latest 8)
router.get("/new", getNewCollection);

// Get popular products in women category
router.get("/popularinwomen", getPopularInWomen);

// Get related products by category
router.post("/related", getRelatedProducts);

module.exports = router;