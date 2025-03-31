const express = require("express");
const router = express.Router();
const Signal = require("../models/Signal");

// 🔹 Signaal aanmaken (met check op bestaande actieve signalen)
router.post("/", async (req, res) => {
  const { groupId, pointId, emoji, duration } = req.body;
  const now = new Date();

  // ❌ Check of er al een actief signaal is voor deze groep op dit punt
  const existing = await Signal.findOne({
    groupId,
    pointId,
    expiresAt: { $gt: now } // nog niet verlopen
  });

  if (existing) {
    return res.status(409).json({ message: "Deze groep heeft al een actief signaal op dit punt." });
  }

  // ✅ Nieuw signaal aanmaken
  const expiresAt = new Date(now.getTime() + duration * 60000);
  const signal = new Signal({ groupId, pointId, emoji, expiresAt });
  await signal.save();
  res.status(201).json(signal);
});

// 🔸 Actieve signalen per punt ophalen
router.get("/display/:pointId", async (req, res) => {
  const pointId = parseInt(req.params.pointId);
  const now = new Date();

  const signals = await Signal.find({
    pointId,
    expiresAt: { $gt: now }
  }).populate("groupId"); // voor latere uitbreidingen

  res.json(signals);
});

module.exports = router;
