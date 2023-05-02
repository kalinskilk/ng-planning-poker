import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  @ViewChild('templateButtonNewRoom', { read: ViewContainerRef })
  templateButtonNewRoom!: ViewContainerRef;

  @ViewChild('templateJoinRoom', { read: ViewContainerRef })
  templateJoinRoom!: ViewContainerRef;

  exitPage = false;

  constructor(private router: Router) {}

  createNewRoom(): void {
    this.exitPage = true;
    window.setTimeout(() => {
      this.router.navigate(['/new-room']);
      this.exitPage = false;
    }, 750);
  }

  joinRoom(): void {
    this.exitPage = true;
    window.setTimeout(() => {
      this.router.navigate(['/join-room']);
      this.exitPage = false;
    }, 750);
  }
}
