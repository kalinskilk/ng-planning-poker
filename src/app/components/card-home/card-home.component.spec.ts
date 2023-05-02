import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CardHomeComponent } from './card-home.component';

@Component({
  template: `
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <app-card-home
            [footerTemplate]="templateButtonNewRoom"
            [exitPage]="exitPage"
          >
            <h4 id="title-new-room">Criar Uma sala</h4>
            <p id="sub-title-new-room">
              Crie uma sala para jogar com seus amigos.
            </p>
          </app-card-home>
        </div>
      </div>
    </div>
    <ng-template #templateButtonNewRoom>
      <button
        type="button"
        class="btn btn-sm btn-block btn-card"
        id="btn-new-room"
      >
        Criar sala
      </button>
    </ng-template>
  `,
})
class WrapperComponent {
  @ViewChild(CardHomeComponent, { static: true })
  cardHomeComponentRef!: CardHomeComponent;
  public exitPage = false;

  @ViewChild('templateButtonNewRoom', { read: ViewContainerRef })
  templateButtonNewRoom!: ViewContainerRef;
}

describe('CardHomeComponent', () => {
  let component: CardHomeComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardHomeComponent, WrapperComponent],
      imports: [BrowserAnimationsModule],
      //teardown: { destroyAfterEach: false }, //SHOW COMPONENT ON TESTS
    })
      .overrideComponent(CardHomeComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(WrapperComponent);
    const wrapcomponent = fixture.componentInstance;

    component = wrapcomponent.cardHomeComponentRef;
    fixture.detectChanges();
  });

  it('#1 should create', () => {
    expect(component).toBeDefined();
  });

  it('[integration] #2 should render contents', () => {
    const titleRoom = fixture.debugElement.query(By.css('#title-new-room'));
    const subTitleRoom = fixture.debugElement.query(
      By.css('#sub-title-new-room')
    );
    expect(titleRoom.nativeElement.innerHTML.trim()).toBe('Criar Uma sala');
    expect(subTitleRoom.nativeElement.innerHTML.trim()).toBe(
      'Crie uma sala para jogar com seus amigos.'
    );
  });

  it('[integration] #3 should render footer template', () => {
    const btnNewRoom = fixture.debugElement.query(By.css('#btn-new-room'));
    expect(btnNewRoom.nativeElement.innerHTML.trim()).toBe('Criar sala');
  });

  it('[integration] #4 should render icon plus', () => {
    component.useIconPlus = true;
    fixture.detectChanges();

    const spanUseIcon = fixture.debugElement.query(By.css('#use-icon-plus'));
    const spanNoUseIcon = fixture.debugElement.query(
      By.css('#no-use-icon-plus')
    );

    expect(spanUseIcon.nativeElement).toBeDefined();
    expect(spanNoUseIcon).toBeNull();
  });

  it('[integration] #5 should no render icon plus', () => {
    component.useIconPlus = false;
    fixture.detectChanges();

    const spanUseIcon = fixture.debugElement.query(By.css('#use-icon-plus'));
    const spanNoUseIcon = fixture.debugElement.query(
      By.css('#no-use-icon-plus')
    );

    expect(spanUseIcon).toBeNull();
    expect(spanNoUseIcon.nativeElement).toBeDefined();
  });
});
