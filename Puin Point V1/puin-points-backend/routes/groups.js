const express = require("express");
const router = express.Router();
const Group = require("../models/Group");

// ✅ Alle groepen ophalen (voor admin.html)
router.get("/", async (req, res) => {
  const groups = await Group.find({});
  res.json(groups);
});

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

// Voeg een lid toe aan een groep
router.post("/:id/join", async (req, res) => {
  const { memberName } = req.body;
  const name = memberName?.trim(); // spaties eruit
  if (!name) return res.status(400).json({ message: "Naam is verplicht." });

  const group = await Group.findById(req.params.id);
  if (!group) return res.status(404).send("Group not found");

  // voorkomt dubbele toevoeging
  if (!group.members.includes(name)) {
    group.members.push(name);
    await group.save();
  }

  res.status(200).json(group);
});


// Verwijder alle groepen (admin reset)
router.delete("/", async (req, res) => {
  await Group.deleteMany({});
  res.status(200).json({ message: "Alle groepen verwijderd." });
});


module.exports = router;
