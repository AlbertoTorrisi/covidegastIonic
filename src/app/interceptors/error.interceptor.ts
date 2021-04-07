import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        console.log(err);
        if (err.status === 401) {
          this.authenticationService.logOut();
          this.router.navigateByUrl('/login');
        }
        if (err.status === 404) {
          this.router.navigateByUrl('/notFound');
        }
        const error = err.error.message || err.error.detail || err.statusText;
        console.log(error);
        return throwError(error);
      })
    );
  }
}
