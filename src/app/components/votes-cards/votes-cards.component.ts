import { Component, Input } from '@angular/core';
import {
  fadeOutAnimation,
  flipAnimation,
  zoomInOnEnterAnimation,
} from 'angular-animations';

@Component({
  selector: 'app-votes-cards',
  templateUrl: './votes-cards.component.html',
  styleUrls: ['./votes-cards.component.scss'],
  animations: [zoomInOnEnterAnimation(), flipAnimation(), fadeOutAnimation()],
  /*   changeDetection: ChangeDetectionStrategy.OnPush, */
})
export class VotesCardsComponent {
  @Input() name: string = '';
  @Input() pointVote: number | null = 0;
  @Input() flipped: boolean = false;
}
