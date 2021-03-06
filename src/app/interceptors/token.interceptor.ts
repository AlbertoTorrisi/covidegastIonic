import { AuthenticationService } from './../services/authentication.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    public toastController: ToastController,
    public authService: AuthenticationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.currentAuthTokenValue();
    if (token) {
      request = request.clone({
        setHeaders: {
          'x-auth-token': token,
          'content-type': 'application/json',
        },
      });
    }
    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      })
    );
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}
