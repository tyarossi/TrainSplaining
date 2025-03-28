const Stop = require("../models/stationModel"); // Ensure correct model path
const express = require("express");
const router = express.Router();

const MBTA_API_BASE = "https://api-v3.mbta.com";
const MBTA_API_KEY = process.env.MBTA_API_KEY; // Store your MBTA API key in .env

router.get("/getStationsById", async (req, res) => {
  try {
    const stop = await Stop.findById(req.params.id).populate("lines");
    if (!stop) return res.status(404).json({ error: "Stop not found." });
    res.json(stop);
  } catch (err) {
    res.status(500).json({ error: "Server error retrieving stop." });
  }
});
