const mongoose = require('mongoose');

const gameStateSchema = new mongoose.Schema({
  gameId: Number,
  currentTurn: Number,
  currentPhase: Number,
  scenario: String,
  playerNames: [String],
  // Add other game state properties as needed
});

const GameState = mongoose.model('GameState', gameStateSchema);

module.exports = GameState;
