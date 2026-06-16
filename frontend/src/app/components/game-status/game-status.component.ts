import { Component, Input } from '@angular/core';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-game-status',
  template: ` @if (game) {
    @if (game.status === 'win') {
      <p>Player {{ game.winner }} wins!</p>
    } @else if (game.status === 'draw') {
      <p>It's a draw!</p>
    } @else {
      <p>Player {{ game.currentPlayer }}'s turn</p>
    }
  }`,
  styleUrl: './game-status.component.css',
})
export class GameStatusComponent {
  @Input() game: Game | null = null;
}
