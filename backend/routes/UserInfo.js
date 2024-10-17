const express = require("express");
const mongoose = require("mongoose");
const UserData = require("../models/AccountInfo"); // Import your UserData model
const Inforouter = express.Router();

// Route to handle adding user address data
Inforouter.post("/address", async (req, res) => {
  try {
    const { street, city, state, postalCode, country, userId } = req.body;

    // Validate the user data received from the request
    if (!street || !city || !state || !postalCode || !country || !userId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new address entry
    const newAddress = new UserData({
      street,
      city,
      state,
      postalCode,
      country,
      userId,  // Make sure this ID corresponds to a valid user in your UserLogin model
    });

    // Save the new address entry in the database
    const savedAddress = await newAddress.save();
    res.status(201).json({ message: "Address saved successfully", savedAddress });
  } catch (error) {
    res.status(500).json({ error: "Failed to save address", details: error.message });
  }
});

module.exports = Inforouter;
