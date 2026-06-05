class TicTacToeGame {
  constructor(id) {
    this.id = id; // Unique game identifier
    this.board = Array(9).fill(null); // 9 cells, all empty initially
    this.currentPlayer = "X"; // X always starts
    this.winner = null; // No winner yet
    this.isDraw = false; // Not a draw yet
    this.isGameOver = false; // Game is active
    this.status = "active";
  }

  //   **Understanding the board:**

  // Board positions:
  // [0] [1] [2]
  // [3] [4] [5]
  // [6] [7] [8]

  // Example board state:
  // ['X', null, 'O']
  // [null, 'X', null]
  // ['O', null, 'X']

  makeMove(position) {
    // Validation: Can't move if game is over or cell is taken

    if (this.status !== "active") {
      return { success: false, status: this.status, message: "Game is over" };
    }

    if (this.board[position] !== null) {
      return { success: false, message: "Invalid move" };
    }

    if (position < 0 || position > 8 || !Number.isInteger(position)) {
      return { success: false, message: "Invalid position" };
    }

    // Place the current player's mark
    this.board[position] = this.currentPlayer;

    // Check if this move created a winner
    this.winner = this.checkWinner();

    if (this.winner) {
      this.isGameOver = true;
      this.status = "win";
      return { success: true, status: this.status, winner: this.winner };
    }

    // Check for draw (all cells filled, no winner)
    if (this.board.every((cell) => cell !== null)) {
      this.isDraw = true;
      this.isGameOver = true;
      this.status = "draw";
      return { success: true, status: this.status };
    }

    // Switch to the other player
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";

    return { success: true, status: this.status };
  }

  checkWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[b] === this.board[c]
      ) {
        return this.board[a];
      }
    }

    return null;
  }
}

module.exports = TicTacToeGame;
