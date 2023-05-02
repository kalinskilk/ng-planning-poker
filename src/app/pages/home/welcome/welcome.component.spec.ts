import { CommonModule } from '@angular/common';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardHomeModule } from 'src/app/components/card-home/card-home.module';

import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        CardHomeModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [WelcomeComponent],
      teardown: { destroyAfterEach: false }, //SHOW COMPONENT ON TESTS
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[unit] #1 should navigate at new-room', fakeAsync(() => {
    spyOn(component['router'], 'navigate');
    component.createNewRoom();

    expect(component.exitPage).toBeTrue();
    tick(750);

    expect(component.exitPage).toBeFalse();
    expect((component as any).router.navigate).toHaveBeenCalled();
  }));

  it('[unit] #2 should navigate at join-room', fakeAsync(() => {
    spyOn(component['router'], 'navigate');
    component.joinRoom();

    expect(component.exitPage).toBeTrue();
    tick(750);

    expect(component.exitPage).toBeFalse();
    expect((component as any).router.navigate).toHaveBeenCalled();
  }));

  it('[integration] #3 should clicked button create new room go new-room page', async () => {
    spyOn(component, 'createNewRoom');

    const buttonNewRoom = fixture.debugElement.query(By.css('#btn-new-room'));
    buttonNewRoom.nativeElement.click();
    await fixture.whenStable();
    expect(component.createNewRoom).toHaveBeenCalled();
  });

  it('[integration] #4 should clicked button join room go join-room page', async () => {
    spyOn(component, 'joinRoom');

    const buttonNewRoom = fixture.debugElement.query(By.css('#btn-join-room'));
    buttonNewRoom.nativeElement.click();
    await fixture.whenStable();
    expect(component.joinRoom).toHaveBeenCalled();
  });
});
