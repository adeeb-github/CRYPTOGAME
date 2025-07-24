const mongoose = require("mongoose")
const roundSchema = new mongoose.Schema({
  crashMultiplier: Number,
  startTime: Date,
  endTime: Date
});
module.exports = mongoose.model("Round", roundSchema);
