import { Component } from '@angular/core';
import { GameBoardComponent } from './components/game-board/game-board.component';

@Component({
  selector: 'app-root',
  imports: [GameBoardComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
