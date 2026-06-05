const TicTacToeGame = require("./TicTacToeGame");
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// In-memory game storage
const games = new Map();

app.post("/api/v1/games", (req, res) => {
  const id = uuidv4();
  const game = new TicTacToeGame(id);
  games.set(id, game);
  res
    .status(201)
    .json({
      id,
      board: game.board,
      currentPlayer: game.currentPlayer,
      status: game.status,
    });
});

app.get("/api/v1/games/:id", (req, res) => {
  const game = games.get(req.params.id);
  if (!game) return res.status(404).json({ message: "Game not found" });
  res.json({
    id: game.id,
    board: game.board,
    currentPlayer: game.currentPlayer,
    status: game.status,
    winner: game.winner,
  });
});

app.post("/api/v1/games/:id/move", (req, res) => {
  const game = games.get(req.params.id);
  if (!game) return res.status(404).json({ message: "Game not found" });

  const { position } = req.body;
  const result = game.makeMove(position);

  if (!result.success) return res.status(400).json({ message: result.message });

  res.json({
    id: game.id,
    board: game.board,
    currentPlayer: game.currentPlayer,
    status: game.status,
    winner: game.winner,
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
