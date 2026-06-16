import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-cell',
  template: `
    <button (click)="onClick()" [disabled]="disabled || value !== null">
      {{ value }}
    </button>
  `,
  styleUrl: './game-cell.component.css',
})
export class GameCellComponent {
  @Input() value: string | null = null;
  @Input() disabled: boolean = false;
  @Output() cellClick = new EventEmitter<void>();

  onClick(): void {
    this.cellClick.emit();
  }
}
