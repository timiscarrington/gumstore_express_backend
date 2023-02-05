const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//63dec71ffefea14abeb87dbd
const CartItemSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  qty: {
    type: Number,
    required: true
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

const CartSchema = new Schema({
  customer: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Customer',
  required: true
  },
  first_name: {
  type: String,
  required: true
  },
  last_name: {
  type: String,
  required: true
  },
  email: {
  type: String,
  required: true
  },
  items: [CartItemSchema],
  date_added: {
  type: Date,
  default: Date.now
  },
  },{timestamps: true});
  

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart
