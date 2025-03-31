const express = require("express");
const router = express.Router();
const Signal = require("../models/Signal");

// Signaal aanmaken
router.post("/", async (req, res) => {
  const { groupId, pointId, emoji, duration } = req.body;
  const expiresAt = new Date(Date.now() + duration * 60000);
  const signal = new Signal({ groupId, pointId, emoji, expiresAt });
  await signal.save();
  res.json(signal);
});

// Actieve signalen per punt ophalen
router.get("/display/:pointId", async (req, res) => {
  const pointId = parseInt(req.params.pointId);
  const now = new Date();
  const signals = await Signal.find({ pointId, expiresAt: { $gt: now } }).populate("groupId");
  res.json(signals);
});

module.exports = router;
