import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(initialRequest: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token) {
      const clonedRequest = initialRequest.clone({
        headers: initialRequest.headers.set("Authorization",
          "Bearer " + token)
      });

      return next.handle(clonedRequest);
    }
    else {
      return next.handle(initialRequest);
    }
  }
}

