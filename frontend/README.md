# Frontend

Angular 19 app for the tic-tac-toe game. Communicates with the backend REST API via `HttpClient`.

## Requirements

- Node.js v22+
- npm
- Backend running on `http://localhost:3000`

## Setup

```bash
npm install
```

## Running

```bash
npm start   # ng serve — http://localhost:4200
```

## Tests

```bash
npm test   # Karma + Jasmine, watch mode
```

## Architecture

| Path | Description |
| ---- | ----------- |
| `src/app/models/game.model.ts` | `Game` interface matching the API response |
| `src/app/services/game.service.ts` | HTTP calls to the backend (`createGame`, `getGame`, `makeMove`) |
| `src/app/components/game-cell/` | Single board cell — `value` and `disabled` inputs, `cellClick` output |
| `src/app/components/game-status/` | Displays current player, winner, or draw message |
| `src/app/components/game-board/` | Root game component — manages state and renders the 3×3 grid |
| `src/environments/` | API URL configuration per environment |
