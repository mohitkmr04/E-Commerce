const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  let products = await Product.find({});
  let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const product = new Product({
    id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_prices: req.body.new_prices,
    old_prices: req.body.old_prices,
  });

  await product.save();
  res.json({ success: true, name: req.body.name });
};

exports.removeProduct = async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true, name: req.body.name });
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.send(products);
};

exports.getNewCollection = async (req, res) => {
  const products = await Product.find({});
  const newCollection = products.slice(1).slice(-8);
  res.send(newCollection);
};

exports.getPopularInWomen = async (req, res) => {
  const products = await Product.find({ category: "women" });
  res.send(products.slice(0, 4));
};

exports.getRelatedProducts = async (req, res) => {
  const { category } = req.body;
  const products = await Product.find({ category });
  res.send(products.slice(0, 4));
};
