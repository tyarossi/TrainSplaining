const express = require("express");
const router = express.Router();
const axios = require("axios");
const Stop = require("../models/stationModel"); // Ensure correct model path

const MBTA_API_BASE = "https://api-v3.mbta.com";
const MBTA_API_KEY = process.env.MBTA_API_KEY; // Store your MBTA API key in .env

// GET all stops (from DB)
router.get("/getAllStations", async (req, res) => {
  try {
    const stops = await Stop.find().populate("lines");
    res.json(stops);
  } catch (err) {
    res.status(500).json({ error: "Server error retrieving stops." });
  }
});
