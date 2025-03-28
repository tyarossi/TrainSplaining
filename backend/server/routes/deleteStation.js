const express = require("express");
const router = express.Router();
const Stop = require("../models/stationModel"); // Ensure correct model path

const MBTA_API_BASE = "https://api-v3.mbta.com";
const MBTA_API_KEY = process.env.MBTA_API_KEY; // Store your MBTA API key in .env

router.delete("/deleteStation", async (req, res) => {
  try {
    const deletedStop = await Stop.findByIdAndDelete(req.params.id);
    if (!deletedStop) return res.status(404).json({ error: "Stop not found." });
    res.json({ message: "Stop deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Error deleting stop." });
  }
});
