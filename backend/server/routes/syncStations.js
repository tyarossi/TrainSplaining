const express = require("express");
const router = express.Router();
const axios = require("axios");
const Stop = require("../models/stationModel"); // Ensure correct model path
const newUserModel = require('../models/userModel')

const MBTA_API_BASE = "https://api-v3.mbta.com";
const MBTA_API_KEY = process.env.MBTA_API_KEY; // Store your MBTA API key in .env


// SYNC stops from MBTA API
router.get("/syncStations", async (req, res) => {
  try {
    const response = await axios.get(`${MBTA_API_BASE}/stops`, {
      params: { api_key: MBTA_API_KEY }
    });

    const mbtaStops = response.data.data.map(stop => ({
      mbtaId: stop.id,
      color: stop.attributes.color,
      address: stop.attributes.address,
    }));

    for (const stopData of mbtaStops) {
      await Stop.findOneAndUpdate(
        { mbtaId: stopData.mbtaId },
        stopData,
        { upsert: true, new: true }
      );
    }

    res.json({ message: "Stops synchronized with MBTA API." });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stops from MBTA API." });
  }
});
