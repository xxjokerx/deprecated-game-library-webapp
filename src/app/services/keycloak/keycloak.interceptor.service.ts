import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {KeycloakService} from './keycloak.service';
import {mergeMap, take} from 'rxjs/operators';

@Injectable()
export class KeycloakInterceptorService implements HttpInterceptor {

  constructor(private keycloakService: KeycloakService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.keycloakService.isLoggedIn()) {
      return this.getUserToken().pipe(
        take(1),
        mergeMap((token) => {
          if (token) {
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            });
          }
          return next.handle(request);
        }));
    }
    return next.handle(request);
  }

  getUserToken() {
    const tokenPromise: Promise<string> = this.keycloakService.getToken();
    const tokenObservable: Observable<string> = from(tokenPromise);
    return tokenObservable;
  }
}
