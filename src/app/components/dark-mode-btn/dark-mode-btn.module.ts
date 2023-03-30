import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DarkModeBtnComponent } from './dark-mode-btn.component';

@NgModule({
  declarations: [DarkModeBtnComponent],
  exports: [DarkModeBtnComponent],
  imports: [CommonModule, FormsModule],
})
export class DarkModeBtnModule {}
