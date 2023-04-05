import { Injectable } from '@angular/core';

export enum StorageEnum {
  DARK_MODE = 'DARK_MODE',
}

@Injectable({ providedIn: 'root' })
export class StorageService {
  getItem(key: StorageEnum): string | null {
    return window.localStorage.getItem(key);
  }

  setItem(key: StorageEnum, value: string): void {
    window.localStorage.setItem(key, value);
  }
}
