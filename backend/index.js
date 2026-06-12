const dns      = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
require('dotenv').config();

const authRoutes    = require('./routes/auth');
const productRoutes = require('./routes/products');
const bookingRoutes = require('./routes/bookings');
const contactRoutes = require('./routes/contacts');
const vehicleRoutes = require('./routes/vehicles');
const orderRoutes   = require('./routes/orders');
const reviewRoutes  = require('./routes/reviews');
const addressRoutes = require('./routes/addresses');
const ticketRoutes   = require('./routes/tickets');
const wishlistRoutes  = require('./routes/wishlist');
const referralRoutes  = require('./routes/referrals');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.options('*', cors({ origin: true, credentials: true }));
app.use(express.json());

app.use('/api/auth',      authRoutes);
app.use('/api/products',  productRoutes);
app.use('/api/bookings',  bookingRoutes);
app.use('/api/contacts',  contactRoutes);
app.use('/api/vehicles',  vehicleRoutes);
app.use('/api/orders',    orderRoutes);
app.use('/api/reviews',   reviewRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/tickets',   ticketRoutes);
app.use('/api/wishlist',   wishlistRoutes);
app.use('/api/referrals', referralRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, { family: 4, serverSelectionTimeoutMS: 10000 })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
