import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameBoardComponent } from './game-board.component';
import { Game } from '../../models/game.model';
import { GameService } from '../../services/game.service';
import { of, throwError } from 'rxjs';

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;
  let mockGameService: jasmine.SpyObj<GameService>;

  const mockGame: Game = {
    id: '123',
    board: Array(9).fill(null),
    currentPlayer: 'X',
    status: 'active',
    winner: null,
  };

  const mockGameAfterMove: Game = {
    ...mockGame,
    board: [null, null, null, 'X', null, null, null, null, null],
    currentPlayer: 'O',
  };

  beforeEach(async () => {
    mockGameService = jasmine.createSpyObj('GameService', [
      'createGame',
      'makeMove',
      'getGame',
    ]);
    mockGameService.createGame.and.returnValue(of(mockGame));
    mockGameService.makeMove.and.returnValue(of(mockGameAfterMove));

    await TestBed.configureTestingModule({
      imports: [GameBoardComponent],
      providers: [{ provide: GameService, useValue: mockGameService }],
    }).compileComponents();

    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not render the board on null game', () => {
    component.game = null;
    fixture.detectChanges();
    const board = fixture.nativeElement.querySelector('.board');
    expect(board).toBeNull();
  });

  it('should call createGame on the service when "New Game" button is clicked', () => {
    const button = fixture.nativeElement.querySelector('.new-game');
    button.click();
    expect(mockGameService.createGame).toHaveBeenCalled();
  });

  it('should show error mesage when createGame fails', () => {
    mockGameService.createGame.and.returnValue(
      throwError(() => new Error('Network error')),
    );
    const button = fixture.nativeElement.querySelector('.new-game');
    button.click();
    fixture.detectChanges();
    const errorEl = fixture.nativeElement.querySelector('.error');
    expect(errorEl).not.toBeNull();
    expect(errorEl.textContent).toContain('Failed to create game');
  });

  it('should render 9 cells after game is created', () => {
    const button = fixture.nativeElement.querySelector('.new-game');
    button.click();
    fixture.detectChanges();
    const cells = fixture.nativeElement.querySelectorAll('app-game-cell');
    expect(cells.length).toBe(9);
  });

  it('should call makeMove on the service when a cell is clicked', () => {
    const button = fixture.nativeElement.querySelector('.new-game');
    button.click();
    fixture.detectChanges();
    const cells = fixture.nativeElement.querySelectorAll(
      'app-game-cell button',
    );
    cells[0].click();
    expect(mockGameService.makeMove).toHaveBeenCalled();
  });

  it('should update game after a move is made', () => {
    component.game = mockGame;
    component.onCellClick(3);
    expect(component.game).toEqual(mockGameAfterMove);
  });

  it('should show error message when makeMove fails', () => {
    component.game = mockGame;
    mockGameService.makeMove.and.returnValue(
      throwError(() => new Error('Network error')),
    );
    component.onCellClick(0);
    fixture.detectChanges();
    const errorEl = fixture.nativeElement.querySelector('.error');
    expect(errorEl).not.toBeNull();
    expect(errorEl.textContent).toContain('Failed to make move');
  });
});
