const router = require('express').Router();

/* ── Stripe ───────────────────────────────────────────────────── */
router.post('/create-intent', async (req, res) => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.includes('REPLACE')) {
    return res.status(503).json({ message: 'stripe_not_configured' });
  }
  try {
    const stripe = require('stripe')(key);
    const { amount } = req.body;
    if (!amount || amount < 50) return res.status(400).json({ message: 'Invalid amount.' });
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

/* ── PayPal helpers ───────────────────────────────────────────── */
const PAYPAL_BASE = process.env.PAYPAL_MODE === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getPaypalToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret   = process.env.PAYPAL_SECRET;
  if (!clientId || !secret) throw new Error('paypal_not_configured');
  const resp = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${clientId}:${secret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.error_description || 'PayPal auth failed');
  return data.access_token;
}

/* POST /api/payment/paypal/create-order */
router.post('/paypal/create-order', async (req, res) => {
  try {
    const { amount } = req.body; // dollars (e.g. 29.99)
    if (!amount || amount < 0.01) return res.status(400).json({ message: 'Invalid amount.' });
    const token = await getPaypalToken();
    const resp = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{ amount: { currency_code: 'USD', value: parseFloat(amount).toFixed(2) } }],
      }),
    });
    const order = await resp.json();
    if (!resp.ok) throw new Error(order.message || 'Failed to create PayPal order');
    res.json({ orderID: order.id });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

/* POST /api/payment/paypal/capture-order */
router.post('/paypal/capture-order', async (req, res) => {
  try {
    const { orderID } = req.body;
    if (!orderID) return res.status(400).json({ message: 'Missing orderID.' });
    const token = await getPaypalToken();
    const resp = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    const capture = await resp.json();
    if (!resp.ok) throw new Error(capture.message || 'Capture failed');
    res.json(capture);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
