# Tic-Tac-Toe

A tic-tac-toe game with a Node.js/Express REST API backend and an Angular frontend.

## Project Structure

```
tic-tac-toe/
  backend/        # Node.js/Express REST API
  bruno/          # API request collection (Bruno)
  frontend/       # Angular 19 app
```

## Requirements

- Node.js v22+
- npm

## Getting Started

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (separate terminal)
cd frontend && npm install && npm start
```

Backend runs on `http://localhost:3000`. Frontend runs on `http://localhost:4200`.

## Backend

### API Routes

| Method | Endpoint                 | Description       |
| ------ | ------------------------ | ----------------- |
| `POST` | `/api/v1/games`          | Create a new game |
| `GET`  | `/api/v1/games/:id`      | Get game state    |
| `POST` | `/api/v1/games/:id/move` | Make a move       |

#### Board positions

```
[0][1][2]
[3][4][5]
[6][7][8]
```

#### Example: make a move

```bash
curl -X POST http://localhost:3000/api/v1/games/<id>/move \
  -H "Content-Type: application/json" \
  -d '{"position": 4}'
```

### Tests

```bash
cd backend
npm test           # single run
npm run test:watch # watch mode
```

## Frontend

Angular 19 standalone components. Communicates with the backend via `HttpClient`.

### Frontend Tests

```bash
cd frontend
npm test   # Karma + Jasmine, runs in watch mode
```

## API Requests (Bruno)

The `bruno/` folder contains a versioned API collection. To use it:

1. Install [Bruno](https://www.usebruno.com/)
2. Open Collection → select the `bruno/` folder
3. Select the `local` environment
4. Run requests — `gameId` is set automatically after "Create Game"

To run via CLI:

```bash
npm install -g @usebruno/cli
bru run --env local bruno/games/
```
