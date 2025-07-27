const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const fetchUser = (req, res, next) => {
    const token = req.header("auth-token")

    if(!token)  return res.status(401).send({errors: "Please authenticate using valid token"});

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({errors: "Invalid token"});
    }
};

module.exports = fetchUser;