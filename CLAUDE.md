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

## Frontend

### Setup

```bash
cd frontend
npm install
npm start   # ng serve — runs on http://localhost:4200
```

The backend must also be running for the app to work. See `environment.ts` for the API URL (`http://localhost:3000/api/v1`).

### Key files

- [frontend/src/app/models/game.model.ts](frontend/src/app/models/game.model.ts) — `Game` interface matching the API response shape.
- [frontend/src/app/services/game.service.ts](frontend/src/app/services/game.service.ts) — `GameService` wrapping all three API calls via `HttpClient`. Returns `Observable<Game>`.
- [frontend/src/app/components/game-cell/](frontend/src/app/components/game-cell/) — Single cell button. Accepts `value` and `disabled` inputs, emits `cellClick`.
- [frontend/src/app/components/game-status/](frontend/src/app/components/game-status/) — Displays current player, winner, or draw message based on `game.status`.
- [frontend/src/app/components/game-board/](frontend/src/app/components/game-board/) — Root game component. Manages game state, calls the service, renders the 3×3 grid and error messages.

All components are standalone (Angular 19).

### Running tests

```bash
cd frontend
npm test   # ng test — Karma + Jasmine, runs in watch mode
```

Test files live alongside their components (`*.spec.ts`). Covers:

- `GameCellComponent` — rendering, click emission, disabled state
- `GameStatusComponent` — active/win/draw/null states
- `GameBoardComponent` — board rendering, service calls, error handling
- `GameService` — HTTP method and URL verification via `HttpTestingController`

## Current Status

- Backend routes and `TicTacToeGame` logic are fully implemented.
- Unit tests cover game logic (moves, win, draw, invalid states).
- Frontend Angular app is fully implemented with components, service, error handling, and unit tests.
