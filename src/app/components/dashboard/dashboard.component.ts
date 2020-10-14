import {Component, OnInit} from '@angular/core';
import {KeycloakInstance} from 'keycloak-js';
import {DataService} from '../../services/data/data.service';
import {KeycloakService} from '../../services/keycloak/keycloak.service';
import {Theme} from '../../model/theme.model';
import {PagedTheme} from '../../model/paged.theme.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public unsecureData: string;
  public userData: string;
  public adminData: string;
  public theme: Theme;
  public themes: Theme[];
  public pagedTheme: PagedTheme;

  public unsecuredError: boolean;
  public adminError: boolean;

  public unsecuredLoaded: boolean;
  public adminLoaded: boolean;

  public unsecuredErrorResponse: any;
  public adminErrorResponse: any;

  public keycloakAuth: KeycloakInstance;

  constructor(private data: DataService,
              private keycloak: KeycloakService) {
  }

  getUnsecuredData() {
    this.data.getUnsecureData().subscribe(
      data => {
        console.log(data);
        this.unsecuredLoaded = true;
        this.unsecureData = data;
      },
      error => {
        console.log(error);
        this.unsecuredLoaded = true;
        this.unsecuredError = true;
        this.unsecuredErrorResponse = {
          status: error.status,
          message: error.message
        };
      }
    );
  }

  getAdminData() {
    this.data.getAdminData().subscribe(
      data => {
        this.adminLoaded = true;
        this.adminData = data;
      },
      error => {
        console.log(error.error);
        this.adminLoaded = true;
        this.adminError = true;
        this.adminErrorResponse = {
          status: error.status,
          message: error.message && this.isJsonString(error.error) ? JSON.parse(error.error).message : error.message
        };
      }
    );
  }

  getAdminThemeList() {
    this.data.getAdminThemeList().subscribe(
      data => {
        this.adminLoaded = true;
        this.pagedTheme = data;
      },
      error => {
        console.log(error.error);
        this.adminLoaded = true;
        this.adminError = true;
        this.adminErrorResponse = {
          status: error.status,
          message: error.message && this.isJsonString(error.error) ? JSON.parse(error.error).message : error.message
        };
      }
    );
    this.themes = this.pagedTheme.content;
  }

  ngOnInit(): void {
    this.keycloakAuth = this.keycloak.getKeycloakAuth();
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }

  displayUserInfo() {
    return this.keycloak.getFullName();
  }

  private isJsonString = (str) => {
    console.log(JSON.parse(str));
    try {
      JSON.parse(str);
    } catch (e) {
      console.log('test');
      return false;
    }
    return true;
  };
}
