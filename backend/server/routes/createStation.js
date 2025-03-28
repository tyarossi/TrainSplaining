const express = require("express");
const router = express.Router();
const Stop = require("../models/stationModel"); // Ensure correct model path

const MBTA_API_BASE = "https://api-v3.mbta.com";
const MBTA_API_KEY = process.env.MBTA_API_KEY; // Store your MBTA API key in .env

router.post("/createStation", async (req, res) => {
  try {
    const { mbtaId, color, address } = req.body;
    const newStop = new Stop({ mbtaId, color, address });
    await newStop.save();
    res.status(201).json(newStop);
  } catch (err) {
    res.status(400).json({ error: "Error creating stop." });
  }
});
 