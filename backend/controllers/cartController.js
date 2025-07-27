const Users = require("../models/User");

exports.addToCart = async (req, res) => {
  const userData = await Users.findById(req.user.id);
  userData.cartData[req.body.itemId] += 1;

  await Users.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
  res.send("Added");
};

exports.removeFromCart = async (req, res) => {
  const userData = await Users.findById(req.user.id);
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }

  await Users.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
  res.send("removed");
};

exports.getCartData = async (req, res) => {
  const userData = await Users.findById(req.user.id);
  res.json(userData.cartData);
};
