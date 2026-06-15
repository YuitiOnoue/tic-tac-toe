import { Component } from '@angular/core';
import { GameBoardComponent } from './components/game-board/game-board.component';

@Component({
  selector: 'app-root',
  imports: [GameBoardComponent],
  template: `<app-game-board />`,
})
export class AppComponent {}
