import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DeckCardModule } from 'src/app/components/deck-card/deck-card.module';
import PlanningRoutingModule from './planning-routing.module';
import { PlanningComponent } from './planning.component';

@NgModule({
  declarations: [PlanningComponent],
  imports: [CommonModule, PlanningRoutingModule, DeckCardModule],
})
export class PlanningModule {}
