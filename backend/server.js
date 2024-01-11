const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const GameState = require('./models/gameState');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection using environment variable
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

const PORT = process.env.PORT || 5000;

// Define routes here

// Save game state
app.post('/api/gamestate', async (req, res, next) => {
    const gameState = new GameState(req.body);
    try {
      const savedState = await gameState.save();
      res.status(201).send(savedState);
    } catch (err) {
      next(err); // Pass the error to the error handling middleware
    }
});

// Load game state
app.get('/api/gamestate/:id', async (req, res, next) => {
    try {
      const gameState = await GameState.findById(req.params.id);
      if (!gameState) {
        return res.status(404).send('Game state not found');
      }
      res.send(gameState);
    } catch (err) {
      next(err); // Pass the error to the error handling middleware
    }
});

// Error handling middleware
app.use((err, req, res, _next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
