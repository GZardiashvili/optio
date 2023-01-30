import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {auth_token} from "../../helpers/constants";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      headers: request.headers.set( 'Authorization',`Bearer ${auth_token}`),
    });
    return next.handle(request).pipe(catchError((err: any) => {
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
    ;
    return next.handle(request);
  }
}
