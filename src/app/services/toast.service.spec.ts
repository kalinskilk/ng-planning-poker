import { TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { IToastInfos, ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastrModule],
      providers: [
        ToastService,
        { provide: ToastrService, useValue: toastStub },
      ],
    }).compileComponents();
    service = TestBed.inject(ToastService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('[unit] #1 info toast call toastr info', () => {
    spyOn(service['toastr'], 'info');
    service.info({
      message: 'test',
      override: {
        timeOut: 1000,
        toastClass: 'toast-info-ng-planning-poker ngx-toastr',
      },
    });
    expect(service['toastr'].info).toHaveBeenCalledWith('test', undefined, {
      timeOut: 1000,
      toastClass: 'toast-info-ng-planning-poker ngx-toastr',
    });
  });

  it('[unit] #2 error toast call toastr error', () => {
    spyOn(service['toastr'], 'error');
    service.error({
      message: 'test',
      override: {
        timeOut: 1000,
        toastClass: 'toast-error-ng-planning-poker ngx-toastr',
      },
    });
    expect(service['toastr'].error).toHaveBeenCalledWith('test', undefined, {
      timeOut: 1000,
      toastClass: 'toast-error-ng-planning-poker ngx-toastr',
    });
  });

  it('[unit] #3 success toast call toastr success', () => {
    spyOn(service['toastr'], 'success');
    service.success({
      message: 'test',
      override: {
        timeOut: 1000,
        toastClass: 'toast-success-ng-planning-poker ngx-toastr',
      },
    });
    expect(service['toastr'].success).toHaveBeenCalledWith('test', undefined, {
      timeOut: 1000,
      toastClass: 'toast-success-ng-planning-poker ngx-toastr',
    });
  });
});

const toastStub = {
  info(infos: IToastInfos) {},
  error(infos: IToastInfos) {},
  success(infos: IToastInfos) {},
};
