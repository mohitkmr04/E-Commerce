const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  const { product } = req.body;

  const lineItems = [
    {
      price_data: {
        currency: "inr",
        product_data: { name: "Your Product Name" },
        unit_amount: Math.round(product * 100),
      },
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "https://e-commerce-sigma-one-91.vercel.app/success",
    cancel_url: "https://e-commerce-sigma-one-91.vercel.app/cancel",
  });

  res.json({ id: session.id });
};
