const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    image: String,
    category: String,
    new_prices: Number,
    old_prices: Number,
    date: {type: Date, default: Date.now},
    available: {type: Boolean,  default: true},
});

module.exports = mongoose.model("Product", productSchema);