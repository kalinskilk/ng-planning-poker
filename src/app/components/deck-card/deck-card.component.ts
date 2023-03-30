import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-deck-card',
  templateUrl: './deck-card.component.html',
  styleUrls: ['./deck-card.component.scss'],
})
export class DeckCardComponent {
  @Input() numberPoints = 0;
  @Input() selected = false;
  @Output() select: EventEmitter<number> = new EventEmitter<number>();

  selectPoint() {
    this.select.emit(this.numberPoints);
  }
}
