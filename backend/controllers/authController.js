const Users = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.signup = async (req,res) => {
    const {username, email, password} = req.body;

    let check = await Users.findOne({email});
    if(check)   return res.status(400).json({success:false, errors: "Email already registered"});

    let cart = {};
    for(let i=0;i<300;i++)  cart[i]=0;

    const user = new Users({name: username, email, password, cartData: cart});
    await user.save();

    const token = jwt.sign({user: {id:user.id}}, process.env.JWT_SECRET);
    res.json({success: true, token});
};

exports.login = async (req,res) => {
    const {email, password} = req.body;

    let user = await Users.findOne({email});
    if(!user)   return res.json({success: false, errors: "Wrong Email Id"});

    if(user.password !== password)  return res.json({success:false, errors: "Wrong Password"});

    const token = jwt.sign({user: {id: user.id}}, process.env.JWT_SECRET);
    res.json({success: true, token});
};