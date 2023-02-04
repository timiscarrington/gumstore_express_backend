const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    maxlength: 200
  },
  price: {
    type: Number
  },
  category: {
    type: String,
    maxlength: 200
  },
  description: {
    type: String,
    maxlength: 6000
  },
  qty: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    maxlength: 300
  },
  image2: {
    type: String,
    maxlength: 300,
    default: 'https://www.jta.org/wp-content/uploads/2017/06/bubble-gum-960x600.jpg'
  }
});

const Products = mongoose.model('Product', ProductSchema);
module.exports = Products