
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  balance: { type: Number, default: 1000 } // in USD
});
module.exports = mongoose.model("User", userSchema);
