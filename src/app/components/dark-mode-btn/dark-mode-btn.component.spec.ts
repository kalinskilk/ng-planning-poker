import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { StorageService } from 'src/app/services/storage.service';

import { DarkModeBtnComponent } from './dark-mode-btn.component';

describe('DarkModeBtnComponent', () => {
  let component: DarkModeBtnComponent;
  let fixture: ComponentFixture<DarkModeBtnComponent>;
  let switchChk: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule],
      declarations: [DarkModeBtnComponent],
      //teardown: { destroyAfterEach: false }, //SHOW COMPONENT ON TESTS
      providers: [StorageService],
    }).compileComponents();

    fixture = TestBed.createComponent(DarkModeBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    switchChk = fixture.debugElement.query(By.css('#switch'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#1 toogle toggleDarkTheme change theme and save in storage', fakeAsync(() => {
    spyOn(component, 'saveDarkMode');

    switchChk.triggerEventHandler('change', { target: { checked: true } });
    fixture.detectChanges();
    tick();

    expect(component.darkMode).toBeTrue();
    expect(component.saveDarkMode).toHaveBeenCalled();
    expect(document.body.classList.value).toBe('dark-theme');
  }));

  it('#2 get preferences set darkMode', () => {
    spyOn(component['storageService'], 'getItem').and.returnValue('true');
    spyOn(component, 'toggleDarkTheme');

    component.getPreferences();
    fixture.detectChanges();

    expect(component.darkMode).toBeTrue();
    expect(component.toggleDarkTheme).toHaveBeenCalled();
  });

  it('#3 get preferences set use lightMode', () => {
    spyOn(component['storageService'], 'getItem').and.returnValue('false');
    spyOn(component, 'toggleDarkTheme');

    component.getPreferences();
    fixture.detectChanges();

    expect(component.darkMode).toBeFalse();
    expect(component.toggleDarkTheme).not.toHaveBeenCalled();
  });
});
