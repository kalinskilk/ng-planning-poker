import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DarkModeBtnModule } from 'src/app/components/dark-mode-btn/dark-mode-btn.module';
import DashBoardRoutingModule from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashBoardRoutingModule, DarkModeBtnModule],
})
export class DashboardModule {}
