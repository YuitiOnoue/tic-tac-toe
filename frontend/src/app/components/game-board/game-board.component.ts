import { Component } from '@angular/core';
import { GameCellComponent } from '../game-cell/game-cell.component';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-board',
  imports: [GameCellComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css',
})
export class GameBoardComponent {
  game: Game | null = null;

  constructor(private gameService: GameService) {}

  createGame(): void {
    this.gameService.createGame().subscribe((game) => {
      this.game = game;
    });
  }

  onCellClick(position: number): void {
    if (!this.game) return;
    this.gameService.makeMove(this.game.id, position).subscribe((game) => {
      this.game = game;
    });
  }
}
