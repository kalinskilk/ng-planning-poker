import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DeckCardComponent } from './deck-card.component';

@NgModule({
  declarations: [DeckCardComponent],
  imports: [CommonModule],
  exports: [DeckCardComponent],
})
export class DeckCardModule {}
