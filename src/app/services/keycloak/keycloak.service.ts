import {Injectable} from '@angular/core';
import * as Keycloak from 'keycloak-js';
import {environment} from '../../../environments/environment';

@Injectable()
export class KeycloakService {

  static auth: any = {};

  constructor() {
  }

  static init(): Promise<any> {
    // @ts-ignore
    /**
     * init KeycloakService with client-id
     */
    const keycloakAuth: Keycloak.KeycloakInstance = Keycloak({
      url: environment.keycloak.url,
      realm: environment.keycloak.realm,
      clientId: environment.keycloak.clientId,
      // @ts-ignore
      'ssl-required': 'external',
      'public-client': true,
      'enable-cors': true,
    });
    KeycloakService.auth.loggedIn = false;
    return new Promise((resolve, reject) => {
      keycloakAuth.init({onLoad: 'check-sso', checkLoginIframe: false})
        .then(() => {
          KeycloakService.auth.loggedIn = false;
          KeycloakService.auth.authz = keycloakAuth;
          console.log(KeycloakService.auth.authz.tokenParsed);
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  }

  getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (KeycloakService.auth.authz.token) {
        KeycloakService.auth.authz
          .updateToken(5)
          .then(() => {
            resolve((KeycloakService.auth.authz.token as string));
          })
          .catch(() => {
            reject('Failed to refresh token');
          });
      } else {
        reject('Not logged in');
      }
    });
  }

  isLoggedIn(): boolean {
    return KeycloakService.auth.authz.authenticated;
  }

  getFullName(): string {
    return KeycloakService.auth.authz.tokenParsed.name;
  }

  login(): void {
    KeycloakService.auth.authz.login().success(
      () => {
        KeycloakService.auth.loggedIn = true;
      }
    );
  }

  logout(): void {
    KeycloakService.auth.authz.logout({redirectUri: document.baseURI}).success(() => {
      KeycloakService.auth.loggedIn = false;
      KeycloakService.auth.authz = null;
    });
  }

  getKeycloakAuth() {
    return KeycloakService.auth.authz;
  }
}
