import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { VotesCardsComponent } from './votes-cards.component';

describe('VotesCardsComponent', () => {
  let component: VotesCardsComponent;
  let fixture: ComponentFixture<VotesCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [VotesCardsComponent],
      //teardown: { destroyAfterEach: false }, //SHOW COMPONENT ON TESTS
    })
      .overrideComponent(VotesCardsComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(VotesCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[integration] #1 render values of vote when is not flipped card', () => {
    component.name = 'TEST';
    component.pointVote = 1;

    fixture.detectChanges();

    const name = fixture.debugElement.query(By.css('.name-votes'));
    expect(name.nativeElement.innerHTML.trim()).toBe('TEST');

    const card = fixture.debugElement.query(By.css('.card'));
    expect(card.nativeElement.classList.value.includes('card-background')).toBe(
      true
    );

    const pointVote = fixture.debugElement.query(By.css('#point-vote'));
    expect(pointVote).toBeNull();
  });

  it('[integration] #2 render values of vote when is flipped card', () => {
    component.name = 'TEST';
    component.pointVote = 1;
    component.flipped = true;
    fixture.detectChanges();

    const name = fixture.debugElement.query(By.css('.name-votes'));
    const card = fixture.debugElement.query(By.css('.card'));
    const pointVote = fixture.debugElement.query(By.css('#point-vote-TEST'));

    expect(name.nativeElement.innerHTML.trim()).toBe('TEST');
    expect(
      card.nativeElement.classList.value.includes('card-no-background')
    ).toBe(true);
    expect(pointVote.nativeElement.innerHTML.trim()).toBe('1');
  });
});
