const router = require('express').Router();

// POST /api/payment/create-intent
// Creates a Stripe PaymentIntent and returns the clientSecret to the frontend.
// If STRIPE_SECRET_KEY is not configured (still placeholder), returns 503 so the
// frontend can fall back to cash-on-delivery mode.
router.post('/create-intent', async (req, res) => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.includes('REPLACE')) {
    return res.status(503).json({ message: 'stripe_not_configured' });
  }

  try {
    const stripe = require('stripe')(key);
    const { amount } = req.body; // amount in cents (e.g. total * 100)
    if (!amount || amount < 50) {
      return res.status(400).json({ message: 'Invalid amount.' });
    }
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });
    res.json({ clientSecret: intent.client_secret });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
