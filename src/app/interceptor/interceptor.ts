import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    /*     const token = this.utilsService.getStorage("AuthToken"); //this.token.storageGetString("AuthToken");
    let arr = [token];

    const authReq2 = req.clone({ setHeaders: { Authorization: arr } }); */
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `${error.error.message}`;
        } else {
          errorMsg = `${error.error.message}`;
        }
        this.toastr.error(errorMsg);
        console.error(error);
        return throwError(() => errorMsg);
      })
    );
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
];
