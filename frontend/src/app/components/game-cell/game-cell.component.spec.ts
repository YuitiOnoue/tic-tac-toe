import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameCellComponent } from './game-cell.component';

describe('GameCellComponent', () => {
  let component: GameCellComponent;
  let fixture: ComponentFixture<GameCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the value in the button', () => {
    component.value = 'X';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent.trim()).toBe('X');
  });

  it('should emit cellClick when button is clicked', () => {
    spyOn(component.cellClick, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.cellClick.emit).toHaveBeenCalled();
  });

  it('should disable the button when value is set', () => {
    component.value = 'O';
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
  });

  it('should disable the button when disabled input is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTrue();
  });
});
