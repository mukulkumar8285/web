const Razorpay = require('razorpay');
const express = require("express");

const payrouter = express.Router();
const razorpay = new Razorpay({
    key_id: 'rzp_test_Z9MHu3v7IiVF8t',
    key_secret: 'HKs02znAN9HXuSk31fLxnAAC',
});

// HKs02znAN9HXuSk31fLxnAAC api secret
payrouter.post('/create-order', async (req, res) => {
    const { amount } = req.body;

    const options = {
        amount: amount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        receipt: 'receipt#1',
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Success route
payrouter.get('/success', (req, res) => {
    res.send('Payment successful!');
});

// Cancel route
payrouter.get('/cancel', (req, res) => {
    res.send('Payment canceled!');
});

module.exports = payrouter;