import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {KeycloakService} from '../../services/keycloak/keycloak.service';

@Injectable({providedIn: 'root'})
export class DashboardResolverService implements Resolve<boolean> {

  constructor(private keycloak: KeycloakService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    return this.keycloak.isLoggedIn();
  }


}
