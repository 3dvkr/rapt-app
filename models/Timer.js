const mongoose = require("mongoose");

const TimerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  sessionType: {
      type: String,
      default: "work",
      required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  memo: {
    type: String
  }
});

module.exports = mongoose.model("Timer", TimerSchema); // exports to controllers/timers.js
