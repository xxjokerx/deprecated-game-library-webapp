import {Injectable} from '@angular/core';
import {PagedThemes} from '../../model/paged.themes.model';

@Injectable({providedIn: 'root'})
export class ThemeService {
  private pagedTheme: PagedThemes;

  setPagedThemes(pagedThemes: PagedThemes): void {
    this.pagedTheme = pagedThemes;
  }

  getPagedTheme(): PagedThemes {
    return this.pagedTheme;
  }
}
