const express = require("express");
const router = express.Router();
const Challenge = require("../models/Challenge");

// ==============================
// GET all challenges
// ==============================
router.get("/", async (req, res, next) => {
  try {
    const challenges = await Challenge.find().sort({ createdAt: -1 });
    res.json(challenges);
  } catch (err) {
    next(err);
  }
});

// ==============================
// GET a single challenge by ID
// ==============================
router.get("/:id", async (req, res, next) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }
    res.json(challenge);
  } catch (err) {
    next(err);
  }
});

// ==============================
// CREATE a new challenge
// ==============================
router.post("/", async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const newChallenge = new Challenge({ title, description });
    await newChallenge.save();
    res.status(201).json(newChallenge);
  } catch (err) {
    next(err);
  }
});

// ==============================
// UPDATE an existing challenge
// ==============================
router.put("/:id", async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const updatedChallenge = await Challenge.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );

    if (!updatedChallenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    res.json(updatedChallenge);
  } catch (err) {
    next(err);
  }
});

// ==============================
// DELETE a challenge
// ==============================
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedChallenge = await Challenge.findByIdAndDelete(req.params.id);
    if (!deletedChallenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }
    res.json({ message: "Challenge deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
