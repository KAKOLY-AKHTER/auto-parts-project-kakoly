const { Schema, model } = require('mongoose');

const ItemSchema = new Schema({
  productId: { type: Number, required: true },
  name:      { type: String, required: true },
  price:     { type: Number, required: true },
  image:     { type: String, default: '' },
  category:  { type: String, default: '' },
}, { _id: false });

const WishlistSchema = new Schema({
  userEmail: { type: String, required: true, lowercase: true, trim: true, unique: true },
  items:     { type: [ItemSchema], default: [] },
}, { timestamps: true });

module.exports = model('Wishlist', WishlistSchema);
