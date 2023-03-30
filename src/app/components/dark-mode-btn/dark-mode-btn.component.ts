import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dark-mode-btn',
  templateUrl: './dark-mode-btn.component.html',
  styleUrls: ['./dark-mode-btn.component.scss'],
})
export class DarkModeBtnComponent implements OnInit {
  darkMode = true;

  ngOnInit(): void {
    this.getPreferences();
  }

  onChangeMode(): void {
    this.toggleDarkTheme();
  }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }
  /*  TODO: PEGAR DO STORAGE */
  getPreferences(): void {
    this.darkMode = true;
    this.toggleDarkTheme();
  }
}
