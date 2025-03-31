const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: String,
  emoji: String,
  event: String,
  members: [String], // e-mail of naam
});

module.exports = mongoose.model("Group", groupSchema);
