import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { DeckCardModule } from 'src/app/components/deck-card/deck-card.module';
import { VotesCardsModule } from 'src/app/components/votes-cards/votes-cards.module';
import { RoleEnum } from 'src/app/enums/role';
import { IPlayer } from 'src/app/interfaces/player';
import { IVotesRoom } from 'src/app/interfaces/votes-room';
import { RoomService } from 'src/app/services/room.service';
import { IToastInfos, ToastService } from 'src/app/services/toast.service';
import { JoinRoomComponent } from '../home/join-room/join-room.component';

import { PlanningComponent } from './planning.component';
import { PlanningService } from './planning.service';

describe('PlanningComponent', () => {
  let component: PlanningComponent;
  let fixture: ComponentFixture<PlanningComponent>;
  let card: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        DeckCardModule,
        VotesCardsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'join-room', component: JoinRoomComponent },
          { path: 'join-room/:id', component: JoinRoomComponent },
        ]),
      ],
      declarations: [PlanningComponent],
      teardown: { destroyAfterEach: false }, //SHOW COMPONENT ON TESTS
      providers: [
        { provide: PlanningService, useValue: planningServiceStub },
        { provide: ToastService, useValue: toastServiceStub },
        { provide: RoomService, useValue: roomServiceStub },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: (param: string) => 'test-id' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanningComponent);
    component = fixture.componentInstance;

    component.points = [
      { point: 1, selected: false },
      { point: 2, selected: false },
      { point: 3, selected: false },
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[unit] #1 onselect card change selected property of list points', () => {
    spyOn(component['planningService'], 'send');

    component.onSelectCard(1);
    expect(component.points).toEqual([
      { point: 1, selected: true },
      { point: 2, selected: false },
      { point: 3, selected: false },
    ]);
    expect(component['planningService'].send).toHaveBeenCalled();
  });

  it('[unit] #2 onselect card when flipped cards', () => {
    spyOn(component['planningService'], 'send');
    component.isFlippedCards = true;
    component.onSelectCard(1);
    expect(component.points).toEqual([
      { point: 1, selected: false },
      { point: 2, selected: false },
      { point: 3, selected: false },
    ]);
    expect(component['planningService'].send).not.toHaveBeenCalled();
  });

  it('[unit] #3 flip cards', () => {
    spyOn(component['planningService'], 'flipCards');
    component.isFlippedCards = false;
    component.flipCards();
    expect(component['planningService'].flipCards).toHaveBeenCalled();
  });

  it('[unit] #4 restart votation', () => {
    spyOn(component['planningService'], 'restartVotation');
    component.isFlippedCards = true;
    component.flipCards();
    expect(component['planningService'].restartVotation).toHaveBeenCalled();
  });

  it('[unit] #5 go flip cards', fakeAsync(() => {
    spyOn(component, 'sleep');
    component.isFlippedCards = false;
    component.votes = [
      { point: 1, name: 'Test', flipped: false },
      { point: 2, name: 'Test2', flipped: false },
    ];
    component.goFlipCards();
    tick(500);
    expect(component.sleep).toHaveBeenCalledTimes(2);
    expect(component.isFlippedCards).toBeTrue();
  }));

  it('[unit] #6 listenerRoomActions no call action when no typed name', () => {
    component.user.name = '';

    spyOn(component, 'goFlipCards');
    spyOn(component, 'voted');
    spyOn(component, 'restartVotation');
    spyOn(component, 'userJoinRoom');

    component.listenerRoomActions();

    expect(component.goFlipCards).not.toHaveBeenCalled();
    expect(component.voted).not.toHaveBeenCalled();
    expect(component.restartVotation).not.toHaveBeenCalled();
    expect(component.userJoinRoom).not.toHaveBeenCalled();
  });

  it('[unit] #7 listenerRoomActions call action FLIP_CARDS', () => {
    component.user.name = 'Test';
    spyOn(component['planningService'], 'listenerRoom').and.returnValue(
      of({ roomId: 'test-id', action: 'FLIP_CARDS', data: null })
    );
    spyOn(component, 'goFlipCards');
    spyOn(component, 'voted');
    spyOn(component, 'restartVotation');
    spyOn(component, 'userJoinRoom');

    component.listenerRoomActions();

    expect(component.goFlipCards).toHaveBeenCalled();
    expect(component.voted).not.toHaveBeenCalled();
    expect(component.restartVotation).not.toHaveBeenCalled();
    expect(component.userJoinRoom).not.toHaveBeenCalled();
  });

  it('[unit] #8 listenerRoomActions call action VOTE', () => {
    component.user.name = 'Test';
    spyOn(component['planningService'], 'listenerRoom').and.returnValue(
      of({
        roomId: 'test-id',
        action: 'VOTE',
        data: {
          nameUser: 'Test',
          vote: 1,
        },
      })
    );
    spyOn(component, 'goFlipCards');
    spyOn(component, 'voted');
    spyOn(component, 'restartVotation');
    spyOn(component, 'userJoinRoom');

    component.listenerRoomActions();

    expect(component.goFlipCards).not.toHaveBeenCalled();
    expect(component.voted).toHaveBeenCalledWith({
      nameUser: 'Test',
      vote: 1,
    });
    expect(component.restartVotation).not.toHaveBeenCalled();
    expect(component.userJoinRoom).not.toHaveBeenCalled();
  });

  it('[unit] #9 listenerRoomActions call action RESTART_VOTATION', () => {
    component.user.name = 'Test';
    spyOn(component['planningService'], 'listenerRoom').and.returnValue(
      of({
        roomId: 'test-id',
        action: 'RESTART_VOTATION',
        data: null,
      })
    );
    spyOn(component, 'goFlipCards');
    spyOn(component, 'voted');
    spyOn(component, 'restartVotation');
    spyOn(component, 'userJoinRoom');

    component.listenerRoomActions();

    expect(component.goFlipCards).not.toHaveBeenCalled();
    expect(component.voted).not.toHaveBeenCalled();
    expect(component.restartVotation).toHaveBeenCalled();
    expect(component.userJoinRoom).not.toHaveBeenCalled();
  });

  it('[unit] #10 listenerRoomActions call action JOIN_ROOM', () => {
    component.user.name = 'Test';
    spyOn(component['planningService'], 'listenerRoom').and.returnValue(
      of({
        roomId: 'test-id',
        action: 'JOIN_ROOM',
        data: { name: 'Test', role: RoleEnum.PLAYER },
      })
    );
    spyOn(component, 'goFlipCards');
    spyOn(component, 'voted');
    spyOn(component, 'restartVotation');
    spyOn(component, 'userJoinRoom');

    component.listenerRoomActions();

    expect(component.goFlipCards).not.toHaveBeenCalled();
    expect(component.voted).not.toHaveBeenCalled();
    expect(component.restartVotation).not.toHaveBeenCalled();
    expect(component.userJoinRoom).toHaveBeenCalled();
  });

  it('[unit] #11 not user in storage redirect to join-room', () => {
    spyOn(component['storageService'], 'getItem').and.returnValue('');
    spyOn(component['router'], 'navigate');
    spyOn(component['toastr'], 'error');
    spyOn(component['roomService'], 'joinRoom');

    component.getInfosUser();

    expect(component['storageService'].getItem).toHaveBeenCalled();
    expect(component['router'].navigate).toHaveBeenCalled();
    expect(component['toastr'].error).toHaveBeenCalled();
    expect(component['roomService'].joinRoom).not.toHaveBeenCalled();
  });

  it('[unit] #12 user in storage send socket join-room', () => {
    spyOn(component['storageService'], 'getItem').and.returnValue(
      `{"name":"Test","role":"SM"}`
    );
    spyOn(component['roomService'], 'joinRoom').and.returnValue(
      of({
        data: {
          roomId: 'test-id',
        },
        success: true,
        message: '',
      })
    );
    component.roomId = 'test-id';

    component.getInfosUser();
    expect(component['storageService'].getItem).toHaveBeenCalled();
    expect(component.user).toEqual({
      name: 'Test',
      role: RoleEnum.SCRUM_MASTER,
    });
    expect(component['roomService'].joinRoom).toHaveBeenCalledWith(
      { name: 'Test', role: RoleEnum.SCRUM_MASTER },
      'test-id'
    );
  });

  it('[unit] #13 restart votation work', () => {
    spyOn(component['toastr'], 'info');
    component.votes = [{ name: 'Test', point: 1, flipped: true }];
    component.points = [{ point: 1, selected: true }];
    component.isFlippedCards = true;

    component.restartVotation();

    expect(component.votes.length).toBe(0);
    expect(component.isFlippedCards).toBeFalse();
    expect(component.points.find((el) => el.selected)).toBeUndefined();
    expect(component['toastr'].info).toHaveBeenCalledWith({
      message: 'O S.M reiniciou a votação.',
    });
  });

  it('[unit] #14 voted work => when the user has not yet voted', () => {
    component.votes = [];

    component.voted({ nameUser: 'Test', vote: 1 });

    expect(component.votes.find((el) => el.name === 'Test')).toBeDefined();
  });

  it('[unit] #15 voted work => when the user change your vote', () => {
    component.votes = [{ name: 'Test', point: 1, flipped: false }];

    component.voted({ nameUser: 'Test', vote: 2 });

    expect(component.votes.find((el) => el.name === 'Test')?.point).toBe(2);
  });

  it('[unit] #16 voted work => when the user clear your vote', () => {
    component.votes = [{ name: 'Test', point: 2, flipped: false }];

    component.voted({ nameUser: 'Test', vote: null });

    expect(component.votes.find((el) => el.name === 'Test')).toBeUndefined();
  });

  it('[unit] #17 user join at room notify others participants', () => {
    spyOn(component['toastr'], 'info');
    component.userJoinRoom({ name: 'Test', role: RoleEnum.PLAYER });
    expect(component['toastr'].info).toHaveBeenCalledWith({
      message: 'Test entrou na sala.',
    });
  });

  it('[unit] #18 get votes work', () => {
    spyOn(component['planningService'], 'getVotes').and.returnValue(
      of({
        data: {
          room: {
            id: 'test-id',
            players: [],
            votes: [],
            blockVotes: false,
          },
        },
        success: true,
      })
    );
    component.roomId = 'test-id';
    component.getVotes();

    expect(component['planningService'].getVotes).toHaveBeenCalledWith(
      'test-id'
    );
    expect(component.votes.length).toBe(0);
  });

  it('[unit] #19 get votes work', () => {
    spyOn(component['planningService'], 'getVotes').and.returnValue(
      of({
        data: {
          room: {
            id: 'test-id',
            players: [{ name: 'Test', role: RoleEnum.PLAYER }],
            votes: [{ nameUser: 'Test', point: 1 }],
            blockVotes: false,
          },
        },
        success: true,
      })
    );
    component.roomId = 'test-id';
    component.getVotes();

    expect(component['planningService'].getVotes).toHaveBeenCalledWith(
      'test-id'
    );
    expect(component.votes.length).toBe(1);
  });

  it('[integration] #20 onselect card', () => {
    spyOn(component['planningService'], 'send');
    component.roomId = 'test-id';

    fixture.detectChanges();

    card = fixture.debugElement.query(By.css('#card-sel-number-point-1'));
    card.nativeElement.click();
    fixture.detectChanges();

    expect(component.points.find((el) => el.selected)?.point).toBe(1);
    expect(
      (card.nativeElement.classList as DOMTokenList).contains('selected')
    ).toBeTrue();
  });

  it('[integration] #21 clear vote', () => {
    spyOn(component['planningService'], 'send');
    component.roomId = 'test-id';

    fixture.detectChanges();

    card = fixture.debugElement.query(By.css('#card-sel-number-point-1'));

    card.nativeElement.click();
    fixture.detectChanges();
    card.nativeElement.click(); // clear vote
    fixture.detectChanges();

    expect(component.points.find((el) => el.selected)?.point).toBeUndefined();
    expect(
      (card.nativeElement.classList as DOMTokenList).contains('selected')
    ).toBeFalse();
  });

  it('[integration] #22 get votes list votes', () => {
    spyOn(component['planningService'], 'getVotes').and.returnValue(
      of({
        data: {
          room: {
            id: 'test-id',
            players: [{ name: 'Test', role: RoleEnum.PLAYER }],
            votes: [{ nameUser: 'Test', point: 1 }],
            blockVotes: false,
          },
        },
        success: true,
      })
    );
    component.roomId = 'test-id';
    component.getVotes();
    fixture.detectChanges();

    const card = fixture.debugElement.query(By.css('#card-vote-Test'));
    const point = fixture.debugElement.query(By.css('#point-vote--Test'));

    expect(
      (card.nativeElement.classList as DOMTokenList).contains('card-background')
    ).toBeTrue();
    expect(point).toBeNull();
  });

  it('[integration] #22 Scrum master flip cards', () => {
    spyOn(component['planningService'], 'getVotes').and.returnValue(
      of({
        data: {
          room: {
            id: 'test-id',
            players: [{ name: 'Test', role: RoleEnum.PLAYER }],
            votes: [{ nameUser: 'Test', vote: 1 }],
            blockVotes: false,
          },
        },
        success: true,
      })
    );

    spyOn(component, 'flipCards');
    component.user.role = RoleEnum.SCRUM_MASTER;
    component.roomId = 'test-id';
    component.getVotes();
    fixture.detectChanges();

    const btn = fixture.debugElement.query(By.css('#btn-flip-cards'));
    btn.nativeElement.click();
    fixture.detectChanges();
    expect(component.flipCards).toHaveBeenCalled();
  });

  it('[integration] #23 Show cards', fakeAsync(() => {
    spyOn(component['planningService'], 'getVotes').and.returnValue(
      of({
        data: {
          room: {
            id: 'test-id',
            players: [{ name: 'Test', role: RoleEnum.PLAYER }],
            votes: [{ nameUser: 'Test', vote: 1 }],
            blockVotes: false,
          },
        },
        success: true,
      })
    );

    component.user.role = RoleEnum.SCRUM_MASTER;
    component.roomId = 'test-id';
    component.getVotes();
    fixture.detectChanges();

    component.goFlipCards();

    tick(1000);
    fixture.detectChanges();

    const card = fixture.debugElement.query(By.css('#card-vote-Test'));
    const point = fixture.debugElement.query(By.css('#point-vote-Test'));

    expect(
      (card.nativeElement.classList as DOMTokenList).contains(
        'card-no-background'
      )
    ).toBeTrue();
    expect(point.nativeElement.innerHTML).toBe('1');
  }));
});

const planningServiceStub = {
  send(votesRoom: IVotesRoom, roomId: string) {},
  listenerRoom(roomId: string) {
    return of({
      roomId: 'test-id',
      action: 'VOTE',
      data: { nameUser: 'test', vote: 1 },
    });
  },
  flipCards(roomId: string) {},
  restartVotation(roomId: string) {},
  getVotes(roomId: string) {
    return of({
      data: {
        room: {
          id: 'test-id',
          players: [],
          votes: [],
          blockVotes: false,
        },
      },
      success: true,
    });
  },
  leaveRoom(input: { roomId: string; userName: string }) {},
};

const toastServiceStub = {
  error(infos: IToastInfos) {},
  info(infos: IToastInfos) {},
  success(infos: IToastInfos) {},
};

const roomServiceStub = {
  joinRoom(player: IPlayer, roomId: string) {
    return of({ success: true, data: { roomId: 'test-id' }, message: '' });
  },
};
