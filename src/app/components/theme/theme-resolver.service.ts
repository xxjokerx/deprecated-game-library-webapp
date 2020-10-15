import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PagedThemes} from '../../model/paged.themes.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {DataService} from '../../services/data/data.service';
import {KeycloakService} from '../../services/keycloak/keycloak.service';

@Injectable({providedIn: 'root'})
export class ThemeResolverService implements Resolve<PagedThemes> {

  constructor(private dataService: DataService, private keycloak: KeycloakService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PagedThemes> | Promise<PagedThemes> | PagedThemes {
    return this.dataService.fetchThemePagedList();
  }
}
