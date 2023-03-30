import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DeckCardComponent } from './deck-card.component';

describe('DeckCardComponent', () => {
  let component: DeckCardComponent;
  let fixture: ComponentFixture<DeckCardComponent>;
  let card: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [DeckCardComponent],
      //teardown: { destroyAfterEach: false }, //SHOW COMPONENT ON TESTS
    }).compileComponents();

    fixture = TestBed.createComponent(DeckCardComponent);
    component = fixture.componentInstance;
    component.numberPoints = 1;
    fixture.detectChanges();

    card = fixture.debugElement.query(By.css('#card-sel-number-point-1'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[unit] #1 select point emit value', () => {
    spyOn(component.select, 'emit');
    component.selectPoint();
    expect(component.select.emit).toHaveBeenCalledWith(1);
  });

  it('[integration] #2 render points', () => {
    component.numberPoints = 21;
    fixture.detectChanges();
    const numberPoint = fixture.debugElement.query(
      By.css('#card-content-number-point-21')
    ).nativeElement as HTMLElement;

    const innerHTML = numberPoint.innerHTML;
    expect(innerHTML.trim()).toBe('21');
  });

  it('[integration] #3 select point change color card', () => {
    component.selected = true;
    fixture.detectChanges();
    const classList = (card.nativeElement as HTMLElement).classList.value;
    expect(classList.includes('selected')).toBeTrue();
  });

  it('[integration] #4 not select point has color default', () => {
    component.selected = false;
    fixture.detectChanges();
    const classList = (card.nativeElement as HTMLElement).classList.value;
    expect(classList.includes('selected')).toBeFalse();
  });

  it('[integration] #5 on click card emit selected point', async () => {
    spyOn(component, 'selectPoint');

    card.nativeElement.click();
    fixture.detectChanges();

    await fixture.whenStable();
    expect(component.selectPoint).toHaveBeenCalled();
  });
});
