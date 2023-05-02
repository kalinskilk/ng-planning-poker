import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

export interface IToastInfos {
  message: string;
  title?: string;
  override?: Partial<IndividualConfig<any>> | undefined;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private toastr: ToastrService) {}

  info(infos: IToastInfos) {
    this.toastr.info(infos.message, infos.title, {
      ...infos.override,
      toastClass: 'toast-info-ng-planning-poker ngx-toastr',
    });
  }

  error(infos: IToastInfos) {
    this.toastr.error(infos.message, infos.title, {
      ...infos.override,
      toastClass: 'toast-error-ng-planning-poker ngx-toastr',
    });
  }

  success(infos: IToastInfos) {
    this.toastr.success(infos.message, infos.title, {
      ...infos.override,
      toastClass: 'toast-success-ng-planning-poker ngx-toastr',
    });
  }
}
