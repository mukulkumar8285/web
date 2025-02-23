const express = require("express");
const mongoose = require("mongoose");
const UserData = require("../models/AccountInfo"); // Import your UserData model
const Inforouter = express.Router();

// Route to handle adding user address data
Inforouter.post("/address", async (req, res) => {
  try {
    const { street, city, state, postalCode, country, userId , mobile} = req.body;

    // Validate the user data received from the request
    if (!street || !city || !state || !postalCode || !country || !userId || !mobile) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new address entry
    const newAddress = new UserData({
      street,
      city,
      state,
      postalCode,
      country,
      userId,  
      mobile
    });

    // Save the new address entry in the database
    const savedAddress = await newAddress.save();
    res.status(201).json({ message: "Address saved successfully", savedAddress });
  } catch (error) {
    res.status(500).json({ error: "Failed to save address", details: error.message });
  }
});

Inforouter.get("/address/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate the userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    // Find user address by userId
    const userAddress = await UserData.findOne({ userId });

    if (!userAddress) {
      return res.status(404).json({ error: "User address not found" });
    }

    res.status(200).json(userAddress);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch address", details: error.message });
  }
});
module.exports = Inforouter;
