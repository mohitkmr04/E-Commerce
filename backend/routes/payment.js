const express = require("express");
const router = express.Router();
const {createCheckoutSession} = require("../controllers/paymentController");

// Create a Stripe checkout session
router.post("/create-checkout-session", createCheckoutSession);

module.exports = router;