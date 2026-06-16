export interface Game {
  id: string;
  board: (string | null)[];
  currentPlayer: 'X' | 'O';
  status: 'active' | 'win' | 'draw';
  winner: 'X' | 'O' | null;
}
