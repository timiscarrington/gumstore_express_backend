const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    default: '63ddeeccc48ef268493bd7dc',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  date_added: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    maxlength: 200,
    default: ''
  },
  image: {
    type: String,
    maxlength: 300,
    default: ''
  }, 
},{timestamps: true});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart
