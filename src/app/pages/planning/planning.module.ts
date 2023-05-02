import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeckCardModule } from 'src/app/components/deck-card/deck-card.module';
import { VotesCardsModule } from 'src/app/components/votes-cards/votes-cards.module';
import PlanningRoutingModule from './planning-routing.module';
import { PlanningComponent } from './planning.component';

@NgModule({
  declarations: [PlanningComponent],
  imports: [
    CommonModule,
    PlanningRoutingModule,
    DeckCardModule,
    VotesCardsModule,
    FormsModule,
  ],
})
export class PlanningModule {}
