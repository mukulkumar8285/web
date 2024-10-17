
const express = require('express');
const Item = require('../models/itemModel');
const cart = require('../models/cartmodel');

const router = express.Router();


router.post('/', async (req, res) => {
  const { name, size, img, description, color, material, discount, price, category } = req.body;
  
  const discountedPrice = price - (price * discount / 100);

  try {
    
    const newItem = new Item({
      name,
      size,
      rate: discountedPrice, 
      qty: 1,
      img,
      description,
      color,
      material,
      discount,
      price,  
      category
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/item-detail/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate({
      path: 'comments',
      populate: {
        path: 'user',  
        select: 'username' 
      }
    }).populate("likes");;
    if (!item) {
      return res.status(404).send('Item not found');
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().populate({
      path: 'comments',
      populate: {
        path: 'user',  
        select: 'username' 
      }
    }).populate("likes");
    const formattedItems = items.map(item => ({
      ...item.toObject(),
      likesCount: item.likes.length, 
      comments: item.comments, 
    }));

    res.json(formattedItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

router.post('/add-to-cart', async (req, res) => {
  const { name, rate, qty, UserId , img , size , description , color , material , discount , price } = req.body;
  console.log("Request body:", req.body);
  if (!UserId) {
    return res.status(400).json({
      message: 'UserId is required'
    });
  }

  try {

    let existingItem = await cart.findOne({ name, UserId });
    if (existingItem) {
      existingItem.qty += qty;
      await existingItem.save(); 
    } else {
      const newItem = new cart({ name, rate, qty, UserId, size , img , description , color , material , price , discount });
      await newItem.save();
      existingItem = newItem;
    }

    res.status(200).json({
      message: 'Item added to cart',
      data: existingItem
    });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({
      message: 'Failed to add item to cart',
      error: error.message
    });
  }
});

router.post('/sub-to-cart', async (req, res) => {
  const { name, qty, UserId  } = req.body; 
  console.log("Request body:", req.body);

  if (!UserId) {
    return res.status(400).json({ message: "UserId is required" });
  }

  try {
    const existingItem = await cart.findOne({ name, UserId });
    console.log("Existing Item:", existingItem);
    if (existingItem) {
      existingItem.qty -= qty;
      
      if (existingItem.qty <= 0) {
        await cart.deleteOne({ _id: existingItem._id }); 
      } else {
        await existingItem.save(); 
      }
      res.status(200).json({ message: 'Item quantity updated', item: existingItem });
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    console.error("Error updating item quantity in cart:", error);
    res.status(500).json({ message: 'Error updating item in cart', error });
  }
});
router.delete('/remove-from-cart', async (req, res) => {
  const { itemId, UserId } = req.body;
  console.log("Request body:", req.body);


  if (!UserId) {
    return res.status(400).json({ message: "UserId is required" });
  }

  try {
    // Find the item in the cart based on itemId and UserId
    const existingItem = await cart.findOne({ _id: itemId, UserId });

    if (existingItem) {
      // Remove the item from the cart
      await cart.deleteOne({ _id: itemId });
      res.status(200).json({ message: 'Item removed from cart successfully' });
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: 'Error removing item from cart', error: error.message });
  }
});

router.get('/cart', async (req, res) => {
  const UserId = req.query.UserId;
  if (!UserId) {
    return res.status(400).json({ message: "UserId is required" });
  }

  try {
    const cartItems = await cart.find({ UserId })
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Error fetching cart items', error });
  }
});




