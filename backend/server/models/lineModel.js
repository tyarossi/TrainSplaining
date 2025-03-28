const mongoose = require("mongoose");


const newLineSchema = new mongoose.Schema(
  {
    colorName: {
      type: String,
      required: true,
    },
    lineID: {
      type: Number,
      required: true,
      unique: true, 
    },
    stationIDCollection: {
      required: true,
      type: [Number],
    }
  },
  { collection: "lines" }
);

module.exports = mongoose.model('lines', newLineSchema)