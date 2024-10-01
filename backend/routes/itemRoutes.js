
const express = require('express');
const Item = require('../models/itemModel');
const cart = require('../models/cartmodel');

const router = express.Router();


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

router.post('/add-to-cart', async (req, res) => {
  const { name , rate, qty } = req.body; 
  const item = cart.find(item => item.name === name);
  if (item) {
    item.qty += qty; 
  } else {
    const saveItem =  await  cart.create({ name, rate, qty });

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
