# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A tic-tac-toe study project game with Node.js/Express REST API backend and an Angular frontend directory.

## Backend

### Setup & Running

```bash
cd backend
npm install
npm run dev   # development with nodemon auto-reload
npm start     # production
```

Server listens on `PORT` env var or `3000` by default.

### Architecture

- [backend/server.js](backend/server.js) — Express app entry point. Sets up CORS and JSON middleware. Stores all active games in a `Map` (in-memory, no database — state is lost on restart).
- [backend/TicTacToeGame.js](backend/TicTacToeGame.js) — `TicTacToeGame` class encapsulating board state, turn management, and move logic. The board is a flat 9-element array (indices 0–8, row-major). `makeMove(position)` validates the move, places the mark, checks for a winner/draw, and advances the turn. `checkWinner()` is referenced but not yet implemented.

### Current Status

- `server.js` is scaffolded (middleware + `games` Map) but has no routes defined yet.
- `TicTacToeGame` is missing the `checkWinner()` method implementation.
- The `frontend/` directory is empty.
