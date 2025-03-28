const express = require("express");
const router = express.Router();
const Stop = require("../models/stationModel"); // Ensure correct model path

const MBTA_API_BASE = "https://api-v3.mbta.com";
const MBTA_API_KEY = process.env.MBTA_API_KEY; // Store your MBTA API key in .env


router.put("/updateStation", async (req, res) => {
  try {
    const updatedStop = await Stop.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStop) return res.status(404).json({ error: "Stop not found." });
    res.json(updatedStop);
  } catch (err) {
    res.status(400).json({ error: "Error updating stop." });
  }
});