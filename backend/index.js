// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const itemRoutes = require('./routes/itemRoutes');
const router = require('./routes/UserRouter');
const commentRouter = require('./routes/comment');
const payrouter = require('./routes/Payment');
const Inforouter = require('./routes/UserInfo');
// const wishrouter = require('./routes/Wishlist');

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
mongoose.connect('mongodb://localhost:27017/shopping-cart').then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Routes
app.use('/api/items', itemRoutes);
app.use('/auth', router);
app.use("/user" , commentRouter);
app.use("/api/payment" , payrouter);
app.use("/api/user" , Inforouter);

app.post("/api/login" , (req , res)=>{
console.log(req.body);
res.redirect("http://localhost:4200/dashboard");

})


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
