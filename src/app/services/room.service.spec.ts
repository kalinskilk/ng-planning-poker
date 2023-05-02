import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import environment from 'src/environments/environment';
import { RoleEnum } from '../enums/role';
import { RoomService } from './room.service';

describe('RoomService', () => {
  let service: RoomService;
  let httpCtrl: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoomService],
    }).compileComponents();
    service = TestBed.inject(RoomService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('[unit] #1 should create new room', () => {
    service.createNewRoom({ name: 'Test', role: RoleEnum.PLAYER }).subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
        expect(response.data?.roomId).toBe('test-id');
      },
    });

    const mockHttp = httpCtrl.expectOne(`${environment.API}/create-new-room`);
    const httpRequest = mockHttp.request;
    mockHttp.flush({ data: { roomId: 'test-id' }, success: true, message: '' });

    expect(httpRequest.method).toEqual('POST');
  });

  it('[unit] #2 Should return error message for create a new room', () => {
    service.createNewRoom({ name: 'Test', role: RoleEnum.PLAYER }).subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.status).withContext('status').toEqual(500);
      },
    });

    const mockHttp = httpCtrl.expectOne(`${environment.API}/create-new-room`);
    const httpRequest = mockHttp.request;

    mockHttp.flush('error request', {
      status: 500,
      statusText: 'Error',
    });
    expect(httpRequest.method).toEqual('POST');
  });

  it('[unit] #3 should join new room', () => {
    service
      .joinRoom({ name: 'Test', role: RoleEnum.PLAYER }, 'test-id')
      .subscribe({
        next: (response) => {
          expect(response).toBeTruthy();
          expect(response.data?.roomId).toBe('test-id');
        },
      });

    const mockHttp = httpCtrl.expectOne(`${environment.API}/join-room`);
    const httpRequest = mockHttp.request;
    mockHttp.flush({ data: { roomId: 'test-id' }, success: true, message: '' });

    expect(httpRequest.method).toEqual('POST');
  });

  it('[unit] #4 Should return error message for join room', () => {
    service
      .joinRoom({ name: 'Test', role: RoleEnum.PLAYER }, 'test-id')
      .subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
          expect(error.status).withContext('status').toEqual(500);
        },
      });

    const mockHttp = httpCtrl.expectOne(`${environment.API}/join-room`);
    const httpRequest = mockHttp.request;

    mockHttp.flush('error request', {
      status: 500,
      statusText: 'Room does not exists',
    });
    expect(httpRequest.method).toEqual('POST');
  });
});
