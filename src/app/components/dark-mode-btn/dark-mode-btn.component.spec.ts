import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { DarkModeBtnComponent } from './dark-mode-btn.component';

describe('DarkModeBtnComponent', () => {
  let component: DarkModeBtnComponent;
  let fixture: ComponentFixture<DarkModeBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule],
      declarations: [DarkModeBtnComponent],
      //teardown: { destroyAfterEach: false }, //SHOW COMPONENT ON TESTS
    }).compileComponents();

    fixture = TestBed.createComponent(DarkModeBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
