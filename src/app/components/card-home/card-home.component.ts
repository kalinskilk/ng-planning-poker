import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
} from '@angular/core';
import {
  fadeInLeftOnEnterAnimation,
  fadeInRightOnEnterAnimation,
  zoomOutAnimation,
} from 'angular-animations';

@Component({
  selector: 'app-card-home',
  templateUrl: './card-home.component.html',
  styleUrls: ['./card-home.component.scss'],
  animations: [
    fadeInLeftOnEnterAnimation(),
    fadeInRightOnEnterAnimation(),
    zoomOutAnimation(),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHomeComponent {
  @Input() exitPage = false;
  @Input() footerTemplate!: TemplateRef<any>;
  @Input() useIconPlus = true;
}
