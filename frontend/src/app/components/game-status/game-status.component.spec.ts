import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameStatusComponent } from './game-status.component';
import { Game } from '../../models/game.model';

describe('GameStatusComponent', () => {
  let component: GameStatusComponent;
  let fixture: ComponentFixture<GameStatusComponent>;

  const mockGame: Game = {
    id: '123',
    board: Array(9).fill(null),
    currentPlayer: 'X',
    status: 'active',
    winner: null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameStatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render nothing when game is null', () => {
    component.game = null;
    fixture.detectChanges();
    const paragraph = fixture.nativeElement.querySelector('p');
    expect(paragraph).toBeNull();
  });

  it("should show current player's turn when status is active", () => {
    component.game = mockGame;
    fixture.detectChanges();
    const paragraph = fixture.nativeElement.querySelector('p');
    expect(paragraph.textContent.trim()).toBe("Player X's turn");
  });

  it('should show the winner when status is win', () => {
    component.game = { ...mockGame, status: 'win', winner: 'X' };
    fixture.detectChanges();
    const paragraph = fixture.nativeElement.querySelector('p');
    expect(paragraph.textContent.trim()).toBe('Player X wins!');
  });

  it('should show draw message when status is draw', () => {
    component.game = { ...mockGame, status: 'draw', winner: null };
    fixture.detectChanges();
    const paragraph = fixture.nativeElement.querySelector('p');
    expect(paragraph.textContent.trim()).toBe("It's a draw!");
  });
});
