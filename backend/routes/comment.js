const express = require("express");
const Item = require("../models/itemModel");
const Comment = require('../models/Comment');

const commentRouter = express.Router();

commentRouter.post('/items/:itemId/comments', async (req, res) => {
  const { itemId } = req.params;
  const { UserId, comment } = req.body;
  console.log(itemId , UserId , comment);
  try {
    const newComment = new Comment({
      user: UserId,
      comment: comment, 
    });
    await newComment.save(); 
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    item.comments.push(newComment._id); 
    await item.save(); 
    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
});

commentRouter.post('/items/:itemId/like', async (req, res) => {
    const { itemId } = req.params;
    const { UserId } = req.body; 
    try {
      const item = await Item.findById(itemId);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      if (item.likes.includes(UserId)) {
        item.likes.pull(UserId);
        await item.save();
        const updatedItem = await Item.findById(itemId).populate('comments'); 
        return res.status(200).json({ message: 'Unlike added successfully', item: updatedItem });
      }
      item.likes.push(UserId); 
      await item.save();
      const updatedItem = await Item.findById(itemId).populate('comments'); 
      res.status(201).json({ message: 'Like added successfully', item: updatedItem  });
    } catch (error) {
      res.status(500).json({ message: 'Error adding like', error: error.message });
    }
  });

commentRouter.get("/:userId/liked-items", async(req , res)=>{
    const {userId} = req.params;

    try{
        const likedItems = await Item.find({likes: userId}).populate('comments');
        // if(likedItems == 0){
        //     return res.status(200).json({message: 'No liked items found'});
        // }
        res.status(200).json({likedItems: likedItems});
    }catch(error){
        res.status(500).json({message: 'Error fetching liked items', error: error.message});
    }

} )
module.exports = commentRouter;