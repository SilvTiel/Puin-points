const mongoose = require("mongoose");

const signalSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  pointId: Number,
  emoji: String,
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
});

module.exports = mongoose.model("Signal", signalSchema);
