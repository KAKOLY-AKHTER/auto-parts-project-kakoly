// Run once: node scripts/createAdmin.js
// Creates an admin user in MongoDB

require('dotenv').config();
const mongoose = require('mongoose');
const User     = require('../models/User');

const EMAIL    = process.env.ADMIN_EMAIL    || 'admin@fremontauto.com';
const PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@12345';
const NAME     = 'Admin';

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const existing = await User.findOne({ email: EMAIL });
  if (existing) {
    if (existing.role !== 'admin') {
      existing.role = 'admin';
      await existing.save();
      console.log(`Updated existing user to admin: ${EMAIL}`);
    } else {
      console.log(`Admin already exists: ${EMAIL}`);
    }
  } else {
    await User.create({ name: NAME, email: EMAIL, password: PASSWORD, role: 'admin' });
    console.log(`Admin created: ${EMAIL} / ${PASSWORD}`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
