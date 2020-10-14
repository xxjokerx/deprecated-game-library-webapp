import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {PagedTheme} from '../../model/paged.theme.model';

@Injectable()
export class DataService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getUnsecureData() {
    return this.http.get(this.apiUrl + '/', {responseType: 'text'});
  }

  getAdminData() {
    return this.http.get(this.apiUrl + '/admin', {responseType: 'text'});
  }

  getAdminThemeList() {
    return this.http.get<PagedTheme>( this.apiUrl + '/admin/themes/page', {responseType: 'json'});
  }
}
