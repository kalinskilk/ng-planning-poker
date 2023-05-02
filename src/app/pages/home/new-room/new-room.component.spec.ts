import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CardHomeModule } from 'src/app/components/card-home/card-home.module';
import { RoleEnum } from 'src/app/enums/role';
import { RoomService } from 'src/app/services/room.service';
import { StorageEnum } from 'src/app/services/storage.service';
import { IToastInfos, ToastService } from 'src/app/services/toast.service';

import { NewRoomComponent } from './new-room.component';

describe('NewRoomComponent', () => {
  let component: NewRoomComponent;
  let fixture: ComponentFixture<NewRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHomeModule, FormsModule, BrowserAnimationsModule],
      declarations: [NewRoomComponent],
      providers: [
        { provide: RoomService, useValue: roomServiceStub },
        { provide: ToastService, useValue: toastServiceStub },
      ],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    fixture = TestBed.createComponent(NewRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('[unit] #1 getUser infos where is not user saved in storage', () => {
    spyOn((component as any).storageService, 'getItem').and.returnValue(null);

    component.getUser();

    expect(component.name).toBe('');
    expect(component.role).toBe(RoleEnum.SCRUM_MASTER);
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
    expect(selRolePlayer.nativeElement['value'].includes('SM')).toBe(true);
  });

  it('[unit] #3 getUser infos where user saved in storage', () => {
    spyOn((component as any).storageService, 'getItem').and.returnValue(
      `{"name":"Test","role":"SM"}`
    );

    component.getUser();

    expect(component.name).toBe('Test');
    expect(component.role).toBe(RoleEnum.SCRUM_MASTER);
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

    expect(component.name).toBe('Player');
    expect(component.role).toBe(RoleEnum.PLAYER);
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

    expect(component.name).toBe('Visit');
    expect(component.role).toBe(RoleEnum.VISIT);
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

  it('[unit] #9 create new room with not name no action', () => {
    spyOn((component as any).roomService, 'createNewRoom');
    component.name = '';
    component.createNewRoom();

    expect((component as any).roomService.createNewRoom).not.toHaveBeenCalled();
  });

  it('[unit] #10 create new room with name call http', () => {
    spyOn((component as any).storageService, 'setItem');
    spyOn((component as any).router, 'navigate');
    component.name = 'Test';
    component.role = RoleEnum.SCRUM_MASTER;
    component.createNewRoom();

    expect((component as any).storageService.setItem).toHaveBeenCalledWith(
      StorageEnum.USER,
      '{"name":"Test","role":"SM"}'
    );
    expect((component as any).router.navigate).toHaveBeenCalledWith([
      `/planning/test-id`,
    ]);
  });

  it('[integration] #11 create new room with name call http', async () => {
    spyOn(component, 'createNewRoom');
    component.name = 'Test';
    component.role = RoleEnum.SCRUM_MASTER;
    const btnNewRoom = fixture.debugElement.query(By.css('#btn-new-room'));

    btnNewRoom.nativeElement.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.createNewRoom).toHaveBeenCalled();
  });

  it('[unit] #12 join room success', () => {
    spyOn((component as any).router, 'navigate');
    spyOn(component['storageService'], 'setItem');

    component.name = 'Test';
    component.role = RoleEnum.PLAYER;

    component.createNewRoom();

    expect(component['storageService'].setItem).toHaveBeenCalledWith(
      StorageEnum.USER,
      `{"name":"Test","role":"PLAYER"}`
    );
    expect((component as any).router.navigate).toHaveBeenCalledWith([
      `/planning/test-id`,
    ]);
  });

  it('[unit] #13 join room error', () => {
    spyOn(component['toastService'], 'error');
    spyOn(component['roomService'], 'createNewRoom').and.returnValue(
      of({ success: false, data: null, message: 'Error' })
    );

    component.name = 'Test';
    component.role = RoleEnum.PLAYER;

    component.createNewRoom();

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
};

const toastServiceStub = {
  error(infos: IToastInfos) {},
};
