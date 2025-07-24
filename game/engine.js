const Round = require("../models/Round");
let currentMultiplier = 1.0;
let crashPoint = Math.random() * 4 + 1.5; // Example crash point

function startGameLoop(io) {
  setInterval(async () => {
    currentMultiplier += 0.1;
    io.emit("multiplier_update", { multiplier: currentMultiplier.toFixed(2) });

    if (currentMultiplier >= crashPoint) {
      io.emit("crashed", { crashPoint: currentMultiplier.toFixed(2) });
      await Round.create({ crashMultiplier: currentMultiplier });
      currentMultiplier = 1.0;
      crashPoint = Math.random() * 4 + 1.5;
    }
  }, 1000);
}

module.exports = { startGameLoop };
