const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  frequency: {
    type: Number,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastTakenAt: {
    type: Date,
    default: null,
  },
  timesTaken: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Medicine", MedicineSchema);
