const mongoose = require("mongoose")
const betSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  multiplier: Number,
  isCashedOut: Boolean,
  roundId: String
});
module.exports = mongoose.model("Bet", betSchema);