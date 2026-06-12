# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A tic-tac-toe study project with a Node.js/Express REST API backend and an Angular frontend (in progress).

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
- [backend/TicTacToeGame.js](backend/TicTacToeGame.js) — `TicTacToeGame` class encapsulating board state, turn management, and move logic. The board is a flat 9-element array (indices 0–8, row-major). `makeMove(position)` validates the move, places the mark, checks for a winner/draw, and advances the turn.

### API Routes

| Method | Endpoint                 | Description       |
|--------|--------------------------|-------------------|
| `POST` | `/api/v1/games`          | Create a new game |
| `GET`  | `/api/v1/games/:id`      | Get game state    |
| `POST` | `/api/v1/games/:id/move` | Make a move       |

### Testing

```bash
cd backend
npm test            # single run
npm run test:watch  # watch mode
```

Unit tests live in [backend/tests/TicTacToeGame.test.js](backend/tests/TicTacToeGame.test.js) using Jest.

### Debugging

Press `F5` in VS Code — launches the backend with nodemon via [.vscode/launch.json](.vscode/launch.json). Debugger auto-reattaches on file save.

## API Requests (Bruno)

Versioned request collection lives in [bruno/](bruno/). To use:

1. Install [Bruno](https://www.usebruno.com/)
2. Open Collection → select the `bruno/` folder
3. Select the `local` environment
4. Run "Create Game" first — `gameId` is set automatically via post-response script

Run via CLI:

```bash
npm install -g @usebruno/cli
bru run --env local bruno/games/
```

## Node Version

Pinned in [.nvmrc](.nvmrc). Switch to it with:

```bash
nvm use   # switches to pinned version
nvm install  # if not installed yet
```

## Current Status

- Backend routes and `TicTacToeGame` logic are fully implemented.
- Unit tests cover game logic (moves, win, draw, invalid states).
- The `frontend/` directory is empty — Angular app not yet scaffolded.
