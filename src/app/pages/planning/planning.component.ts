import { Component } from '@angular/core';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
})
export class PlanningComponent {
  points = [
    { point: 1, selected: false },
    { point: 2, selected: false },
    { point: 3, selected: false },
    { point: 5, selected: false },
    { point: 8, selected: false },
    { point: 13, selected: false },
    { point: 21, selected: false },
  ];

  onSelectCard(point: number): void {
    const pointSel = this.points.find((el) => el.point === point);
    if (pointSel) {
      pointSel.selected = !pointSel.selected;
    }
    this.points.forEach((el) => {
      if (el.point !== point) {
        el.selected = false;
      }
    });
  }
}
