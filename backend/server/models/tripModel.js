const mongoose = require("mongoose");

//trip schema/model 
const newTripSchema = new mongoose.Schema(
  {
    tripID: {
      type: Number,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      required: true,
    },
    direction: {
      required: true,
      type: Boolean,
      //inbound = true, outbound = false
    },
    headsign: {
      type: String,
      required: true,
      label: "Headsign",
    },
    Status: {
        type: Boolean,
        required: true,
        //running = true, out of service = false  
    },
    Routes: {
        type: String,
        required: true,

    },
    Vehicle: {
        type: String,
        required: true,

    },
  },
  { collection: "trips" }
);

module.exports = mongoose.model('trips', newTripSchema)