import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = <string>localStorage.getItem('auth-token');
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Token ${authToken}`),
    });

    return next.handle(authReq);
  }
}
