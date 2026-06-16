import { Component } from '@angular/core';
import { GameCellComponent } from '../game-cell/game-cell.component';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { GameStatusComponent } from '../game-status/game-status.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-game-board',
  imports: [GameCellComponent, GameStatusComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css',
})
export class GameBoardComponent {
  game: Game | null = null;
  error: string | null = null;

  constructor(private gameService: GameService) {}

  createGame(): void {
    this.error = null;
    this.gameService.createGame().subscribe({
      next: (game) => {
        this.game = game;
      },
      error: (err: HttpErrorResponse) => {
        this.error =
          'Failed to create game. Is the server running? Status: ' + err.status;
      },
    });
  }

  onCellClick(position: number): void {
    if (!this.game) return;
    this.error = null;
    this.gameService.makeMove(this.game.id, position).subscribe({
      next: (game) => {
        this.game = game;
      },
      error: (err: HttpErrorResponse) => {
        this.error =
          'Failed to make move. Is the server running? Status: ' + err.status;
      },
    });
  }
}
