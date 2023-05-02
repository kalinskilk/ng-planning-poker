import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeckCardComponent } from './deck-card.component';

@NgModule({
  declarations: [DeckCardComponent],
  imports: [CommonModule, FormsModule],
  exports: [DeckCardComponent],
})
export class DeckCardModule {}
