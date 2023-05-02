import { Component } from '@angular/core';
import {
  fadeInLeftOnEnterAnimation,
  fadeInRightOnEnterAnimation,
  zoomOutAnimation,
} from 'angular-animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    fadeInLeftOnEnterAnimation(),
    fadeInRightOnEnterAnimation(),
    zoomOutAnimation(),
  ],
})
export class HomeComponent {}
