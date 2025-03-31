const express = require("express");
const router = express.Router();
const Group = require("../models/Group");

// ✅ Nieuwe groep aanmaken
router.post("/", async (req, res) => {
  const { name, emoji, event } = req.body;

  // Check of emoji-combinatie al bestaat
  const existing = await Group.findOne({ emoji, event });
  if (existing) {
    return res.status(409).json({ message: "Emoji-combinatie al in gebruik." });
  }

  const group = new Group({ name, emoji, event, members: [] });
  await group.save();
  res.status(201).json(group);
});

// Groep ophalen
router.get("/:id", async (req, res) => {
  const group = await Group.findById(req.params.id);
  if (!group) return res.status(404).send("Group not found");
  res.json(group);
});

// Lid toevoegen aan groep
router.post("/:id/join", async (req, res) => {
  const { memberName } = req.body;
  const group = await Group.findById(req.params.id);
  if (!group) return res.status(404).send("Group not found");
  group.members.push(memberName);
  await group.save();
  res.json(group);
});

module.exports = router;
