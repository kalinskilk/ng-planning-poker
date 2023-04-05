import { Component, OnInit } from '@angular/core';
import { StorageEnum, StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-dark-mode-btn',
  templateUrl: './dark-mode-btn.component.html',
  styleUrls: ['./dark-mode-btn.component.scss'],
})
export class DarkModeBtnComponent implements OnInit {
  darkMode = true;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.getPreferences();
  }

  onChangeMode(): void {
    this.toggleDarkTheme();
  }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
    this.saveDarkMode();
  }

  saveDarkMode(): void {
    this.storageService.setItem(StorageEnum.DARK_MODE, `${this.darkMode}`);
  }

  getPreferences(): void {
    const darkMode = this.storageService.getItem(StorageEnum.DARK_MODE);
    if (darkMode === 'true') {
      this.darkMode = true;
      this.toggleDarkTheme();
    } else {
      this.darkMode = false;
    }
  }
}
