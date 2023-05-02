import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  bounceInUpOnEnterAnimation,
  fadeInOnEnterAnimation,
} from 'angular-animations';

@Component({
  selector: 'app-deck-card',
  templateUrl: './deck-card.component.html',
  styleUrls: ['./deck-card.component.scss'],
  animations: [fadeInOnEnterAnimation(), bounceInUpOnEnterAnimation()],
})
export class DeckCardComponent implements OnInit {
  @Input() numberPoints = 0;
  @Input() selected = false;
  @Output() select: EventEmitter<number> = new EventEmitter<number>();

  showCard = false;
  selectPoint() {
    this.select.emit(this.numberPoints);
  }

  ngOnInit(): void {
    /* window.setTimeout(() => { */
    this.showCard = true;
    /*   }, 500); */
  }
}
