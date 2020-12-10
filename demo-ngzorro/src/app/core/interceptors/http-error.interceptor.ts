import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NoitifyService } from '../noitify.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private noityfiService: NoitifyService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((responseErrorr: HttpErrorResponse) => {
        if (responseErrorr.status === 401) {
          this.noityfiService.error('', 'Your session is expired' );
          setTimeout(() => { window.location.href = '/account/login'; }, 3000);
          return;
        }
        if (responseErrorr.status === 403) {
          this.noityfiService.error('', 'You dont have permission' );
        }
        const error = responseErrorr.error;
        let msg = '';
        if (error instanceof ErrorEvent ){
          msg = `Eroor : ${error.message}`;
        } else {
          msg = error ? `${error.message || responseErrorr.message}` : responseErrorr.message;
        }
        return throwError(msg);
      })
    );
  }
}
