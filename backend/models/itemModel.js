// models/itemModel.js
const mongoose = require('mongoose');


const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    default :1,
    // required: true,
  },
  brand :{
    type : String,
    default : "kadi socha"
  },
  img:{
    type:Array,
    required:true
  },
  size:{
    type:String,
    enum:['S', 'M', 'L'],
    required:true
  },
  color :{
    type:String,
    required : false
  },
  qty: {
    type: Number,
    required: true,
  },
  description:{
    type:String,
    required:true,
  },
  material  :{
    type : String,
    required : false
  },
  likes: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserLogin', 
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'Comment'  
  }],
  price:{
    type:Number,
    required:true,
  },
  category:{
    type:String,
    // required:true,
  },
  discount:{
    type:Number,
    required:true,
  },
  wishlist: [{
    type: mongoose.Types.ObjectId,
    ref: 'UserLogin'
  }] 
},{timestamps : true});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
