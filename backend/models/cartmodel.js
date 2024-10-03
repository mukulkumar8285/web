// models/itemModel.js
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  img:{
    type:String,
    required:true
  },
  qty: {
    type: Number,
    required: true,
  },
  UserId :{
    type : mongoose.Types.ObjectId,
    ref : "UserLogin",
    required : true
  }
});

const cart = mongoose.model('cart', CartSchema);
module.exports = cart;
