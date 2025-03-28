const mongoose = require("mongoose");

const StopSchema = new mongoose.Schema({
  mbtaId: {
    type: String,
    required: true,
    unique: true
  },
  color: {
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  lines: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Line"
  }]
});

module.exports = mongoose.model("Stops", StopSchema);