import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DeckCardModule } from 'src/app/components/deck-card/deck-card.module';

import { PlanningComponent } from './planning.component';
import { PlanningService } from './planning.service';

describe('PlanningComponent', () => {
  let component: PlanningComponent;
  let fixture: ComponentFixture<PlanningComponent>;
  let card: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, DeckCardModule],
      declarations: [PlanningComponent],
      teardown: { destroyAfterEach: false }, //SHOW COMPONENT ON TESTS
      providers: [PlanningService],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanningComponent);
    component = fixture.componentInstance;

    component.points = [
      { point: 1, selected: false },
      { point: 2, selected: false },
      { point: 3, selected: false },
    ];
    fixture.detectChanges();
    card = fixture.debugElement.query(By.css('#card-sel-number-point-1'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[unit] #1 onselect card change selected property of list points', () => {
    component.onSelectCard(1);
    expect(component.points).toEqual([
      { point: 1, selected: true },
      { point: 2, selected: false },
      { point: 3, selected: false },
    ]);

    component.onSelectCard(2);
    expect(component.points).toEqual([
      { point: 1, selected: false },
      { point: 2, selected: true },
      { point: 3, selected: false },
    ]);

    component.onSelectCard(3);
    expect(component.points).toEqual([
      { point: 1, selected: false },
      { point: 2, selected: false },
      { point: 3, selected: true },
    ]);
  });

  it('[integration] #2 vote call fn onSelectedCard', async () => {
    spyOn(component, 'onSelectCard');

    card.nativeElement.click(); // select 1 point of vote
    fixture.detectChanges();

    await fixture.whenStable();
    expect(component.onSelectCard).toHaveBeenCalledWith(1);
  });
});
