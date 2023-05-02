import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VotesCardsComponent } from './votes-cards.component';

@NgModule({
  declarations: [VotesCardsComponent],
  imports: [CommonModule, FormsModule],
  exports: [VotesCardsComponent],
})
export class VotesCardsModule {}
