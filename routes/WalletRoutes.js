// routes/walletRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create user (if you added it)
router.post("/create", async (req, res) => {
  const user = await User.create({ username: req.body.username });
  res.json(user);
});

router.get("/balance/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ balance: user.balance });
});

router.post("/deposit", async (req, res) => {
  const { userId, amount } = req.body;
  const user = await User.findByIdAndUpdate(
    userId,
    { $inc: { balance: amount } },
    { new: true }
  );
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ balance: user.balance });
});

module.exports = router;
