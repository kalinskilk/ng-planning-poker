import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CardHomeModule } from 'src/app/components/card-home/card-home.module';
import { RoleEnum } from 'src/app/enums/role';
import { RoomService } from 'src/app/services/room.service';
import { StorageEnum } from 'src/app/services/storage.service';
import { IToastInfos, ToastService } from 'src/app/services/toast.service';

import { JoinRoomComponent } from './join-room.component';

describe('JoinRoomComponent', () => {
  let component: JoinRoomComponent;
  let fixture: ComponentFixture<JoinRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CardHomeModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [JoinRoomComponent],
      providers: [
        { provide: RoomService, useValue: roomServiceStub },
        { provide: ToastService, useValue: toastServiceStub },
      ],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    fixture = TestBed.createComponent(JoinRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[unit] #1 getUser infos where is not user saved in storage', () => {
    spyOn((component as any).storageService, 'getItem').and.returnValue(null);

    component.getUser();

    expect(component.player.name).toBe('');
    expect(component.player.role).toBe(RoleEnum.PLAYER);
  });

  it('[integration] #2 getUser infos where is not user saved in storage', () => {
    spyOn((component as any).storageService, 'getItem').and.returnValue(null);
    const nameInput = fixture.debugElement.query(By.css('#input-name'));
    const selRolePlayer = fixture.debugElement.query(
      By.css('#sel-role-player')
    );
    component.getUser();
    fixture.detectChanges();

    expect(nameInput.nativeElement['value']).toBe('');
    expect(selRolePlayer.nativeElement['value'].includes('PLAYER')).toBe(true);
  });

  it('[unit] #3 getUser infos where user saved in storage', () => {
    spyOn((component as any).storageService, 'getItem').and.returnValue(
      `{"name":"Test","role":"SM"}`
    );
    component.getUser();

    expect(component.player.name).toBe('Test');
    expect(component.player.role).toBe(RoleEnum.SCRUM_MASTER);
  });

  it('[integration] #4 getUser infos where user saved in storage', async () => {
    spyOn((component as any).storageService, 'getItem').and.returnValue(
      `{"name":"Test","role":"SM"}`
    );

    component.getUser();
    fixture.detectChanges();
    await fixture.whenStable();

    const nameInput = fixture.debugElement.query(By.css('#input-name'));
    const selRolePlayer = fixture.debugElement.query(
      By.css('#sel-role-player')
    );

    expect(nameInput.nativeElement['value']).toBe('Test');
    expect(selRolePlayer.nativeElement['value'].includes('SM')).toBe(true);
  });

  it('[unit] #5 getUser infos where user saved in storage, role player', () => {
    spyOn((component as any).storageService, 'getItem').and.returnValue(
      `{"name":"Player","role":"PLAYER"}`
    );

    component.getUser();

    expect(component.player.name).toBe('Player');
    expect(component.player.role).toBe(RoleEnum.PLAYER);
  });

  it('[integration] #6 getUser infos where is not user saved in storage', async () => {
    spyOn((component as any).storageService, 'getItem').and.returnValue(
      `{"name":"Player","role":"PLAYER"}`
    );

    component.getUser();
    fixture.detectChanges();
    await fixture.whenStable();

    const nameInput = fixture.debugElement.query(By.css('#input-name'));
    const selRolePlayer = fixture.debugElement.query(
      By.css('#sel-role-player')
    );

    expect(nameInput.nativeElement['value']).toBe('Player');
    expect(selRolePlayer.nativeElement['value'].includes('PLAYER')).toBe(true);
  });

  it('[unit] #7 getUser infos where user saved in storage, role player', () => {
    spyOn((component as any).storageService, 'getItem').and.returnValue(
      `{"name":"Visit","role":"VISIT"}`
    );

    component.getUser();

    expect(component.player.name).toBe('Visit');
    expect(component.player.role).toBe(RoleEnum.VISIT);
  });

  it('[integration] #8 getUser infos where is not user saved in storage', async () => {
    spyOn((component as any).storageService, 'getItem').and.returnValue(
      `{"name":"Visit","role":"VISIT"}`
    );

    component.getUser();
    fixture.detectChanges();
    await fixture.whenStable();

    const nameInput = fixture.debugElement.query(By.css('#input-name'));
    const selRolePlayer = fixture.debugElement.query(
      By.css('#sel-role-player')
    );

    expect(nameInput.nativeElement['value']).toBe('Visit');
    expect(selRolePlayer.nativeElement['value'].includes('VISIT')).toBe(true);
  });

  it('[unit] #9 name not typed call toast msg', () => {
    spyOn(component['toastService'], 'error');

    component.player.name = '';

    component.joinRoom();
    expect(component['toastService'].error).toHaveBeenCalledWith({
      message: 'O campo Nome é obrigatório.',
    });
  });

  it('[unit] #10 sala not typed call toast msg', () => {
    spyOn(component['toastService'], 'error');

    component.player.name = 'Test';
    component.room = '';

    component.joinRoom();
    expect(component['toastService'].error).toHaveBeenCalledWith({
      message: 'O campo Sala é obrigatório.',
    });
  });

  it('[unit] #11 join room success', fakeAsync(() => {
    spyOn((component as any).router, 'navigate');
    spyOn(component['storageService'], 'setItem');

    component.player.name = 'Test';
    component.player.role = RoleEnum.PLAYER;
    component.room = 'test-id';

    component.joinRoom();
    tick(750);

    expect(component['storageService'].setItem).toHaveBeenCalledWith(
      StorageEnum.USER,
      `{"name":"Test","role":"PLAYER"}`
    );

    expect((component as any).router.navigate).toHaveBeenCalledWith([
      `/planning/test-id`,
    ]);
  }));

  it('[unit] #11 join room error', () => {
    spyOn(component['toastService'], 'error');
    spyOn(component['roomService'], 'joinRoom').and.returnValue(
      of({ success: false, data: null, message: 'Error' })
    );

    component.player.name = 'Test';
    component.player.role = RoleEnum.PLAYER;
    component.room = 'test-id';

    component.joinRoom();

    expect(component['toastService'].error).toHaveBeenCalledWith({
      message: 'Error',
      override: { timeOut: 5000 },
    });
  });
});

const roomServiceStub = {
  createNewRoom() {
    return of({ success: true, data: { roomId: 'test-id' }, message: '' });
  },
  joinRoom() {
    return of({ success: true, data: { roomId: 'test-id' }, message: '' });
  },
};

const toastServiceStub = {
  error(infos: IToastInfos) {},
};
