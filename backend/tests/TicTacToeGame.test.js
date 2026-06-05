const TicTacToeGame = require("../TicTacToeGame");

describe("TicTacToeGame", () => {
  let game;

  beforeEach(() => {
    game = new TicTacToeGame("test-id");
  });

  test("starts with empty board and X as first player", () => {
    expect(game.board).toEqual(Array(9).fill(null));
    expect(game.currentPlayer).toEqual("X");
  });

  test("places mark on valid move", () => {
    game.makeMove(4);
    expect(game.board[4]).toBe("X");
  });

  test("switches player after move", () => {
    game.makeMove(4);
    expect(game.currentPlayer).toBe("O");
  });

  test("rejects move on occupied cell", () => {
    game.makeMove(4);
    const result = game.makeMove(4);
    expect(result.success).toBe(false);
  });

  test("detects win", () => {
    game.makeMove(0); // X
    game.makeMove(3); // O
    game.makeMove(1); // X
    game.makeMove(4); // O
    game.makeMove(2); // X wins top row
    expect(game.status).toBe("win");
    expect(game.winner).toBe("X");
  });

  test("detects draw", () => {
    [0, 1, 2, 4, 3, 5, 7, 6, 8].forEach((pos) => game.makeMove(pos));
    expect(game.status).toBe("draw");
  });

  test("rejects move after game over", () => {
    game.makeMove(0);
    game.makeMove(3);
    game.makeMove(1);
    game.makeMove(4);
    game.makeMove(2); // X wins
    const result = game.makeMove(8);
    expect(result.success).toBe(false);
  });
});
