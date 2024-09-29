// routes/itemRoutes.js
const express = require('express');
const Item = require('../models/itemModel');

const router = express.Router();

// Add a new item
router.post('/', async (req, res) => {
  const { name, rate } = req.body;
  try {
    const newItem = new Item({ name, rate, qty :1 });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

// routes/itemRoutes.js
let cart = [];

// Add to cart
router.post('/add-to-cart', (req, res) => {
  const { name , rate, qty } = req.body; // Expecting item ID and quantity
  const item = cart.find(item => item.name === name);
  if (item) {
    item.qty += qty; // Update quantity if item already in cart
  } else {
    cart.push({ name , rate , qty }); // Add new item to cart
  }
  res.status(200).json(cart);
});

router.post('/sub-to-cart', (req, res) => {
  const { name , qty } = req.body; 
  const item = cart.find(item => item.name === name);
  if (item) {
    item.qty -= qty; 
    if(item.qty <= 0){
      const index = cart.indexOf(item);
      cart.splice(index , 1);
    }
  } 
  res.status(200).json(cart);
});

// Get cart items
router.get('/cart', (req, res) => {
  res.json(cart);
});
