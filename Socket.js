const Bet = require("./models/Bet");
const User = require("./models/User");
const Round = require("./models/Round");
const { startGameLoop } = require("./game/engine");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("place_bet", async ({ userId, amount }) => {
      const user = await User.findById(userId);
      if (user.balance >= amount) {
        await User.findByIdAndUpdate(userId, { $inc: { balance: -amount } });
        await Bet.create({ userId, amount, isCashedOut: false });
        socket.emit("bet_placed", { success: true });
      } else {
        socket.emit("bet_placed", { success: false, message: "Insufficient funds" });
      }
    });

    socket.on("cashout", async ({ userId, multiplier }) => {
      const bet = await Bet.findOne({ userId, isCashedOut: false });
      if (bet) {
        const payout = bet.amount * multiplier;
        await User.findByIdAndUpdate(userId, { $inc: { balance: payout } });
        bet.isCashedOut = true;
        bet.multiplier = multiplier;
        await bet.save();
        socket.emit("cashout_success", { amount: payout });
      }
    });
  });

  startGameLoop(io);
};
