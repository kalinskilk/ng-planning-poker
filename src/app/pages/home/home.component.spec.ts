import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CardHomeModule } from 'src/app/components/card-home/card-home.module';
import HomeRoutingModule from './home-routing.module';

import { HomeComponent } from './home.component';
import { JoinRoomComponent } from './join-room/join-room.component';
import { NewRoomComponent } from './new-room/new-room.component';
import { WelcomeComponent } from './welcome/welcome.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        HomeRoutingModule,
        CardHomeModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: HomeComponent,
            children: [
              { path: '', component: WelcomeComponent },
              { path: 'new-room', component: NewRoomComponent },
              { path: 'join-room', component: JoinRoomComponent },
              { path: 'join-room/:id', component: JoinRoomComponent },
            ],
          },
        ]),
      ],
      declarations: [
        HomeComponent,
        NewRoomComponent,
        JoinRoomComponent,
        WelcomeComponent,
      ],
      //teardown: { destroyAfterEach: false }, //SHOW COMPONENT ON TESTS
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#1 Should create', () => {
    expect(component).toBeTruthy();
  });

  it('#2 Should route is empty', () => {
    expect(router.url).toEqual('/');
  });

  it('#3 Should navigate at new room page', async () => {
    await router.navigate(['/new-room']);
    expect(router.url).toEqual('/new-room');
  });

  it('#4 Should navigate at join page', async () => {
    await router.navigate(['/join-room']);
    expect(router.url).toEqual('/join-room');
  });
});
