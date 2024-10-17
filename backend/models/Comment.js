const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'UserLogin', 
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const Comment = mongoose.model("Comment" , commentSchema);
module.exports = Comment;