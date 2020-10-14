import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {PagedThemes} from '../../model/paged.themes.model';
import {tap} from 'rxjs/operators';
import {ThemeService} from '../../components/theme/theme.service';

@Injectable()
export class DataService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private themeService: ThemeService) {
  }

  getUnsecureData() {
    return this.http.get(this.apiUrl + '/', {responseType: 'text'});
  }

  getAdminData() {
    return this.http.get(this.apiUrl + '/admin', {responseType: 'text'});
  }

  fetchThemePagedList() {
    return this.http.get<PagedThemes>(this.apiUrl + '/admin/themes/page', {responseType: 'json'}).pipe(
      tap(pagedThemes => {
        this.themeService.setPagedThemes(pagedThemes);
      }, error => {
        console.log(error);
      })
    );
  }
}
