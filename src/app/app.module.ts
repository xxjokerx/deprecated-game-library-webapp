import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DataService} from './services/data/data.service';
import {KeycloakService} from './services/keycloak/keycloak.service';
import {KeycloakInterceptorService} from './services/keycloak/keycloak.interceptor.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './components/header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {ThemeCountComponent} from './components/theme/theme-count/theme-count.component';
import {HomeComponent} from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    ThemeCountComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    DataService, {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakInterceptorService,
      multi: true
    },
    KeycloakService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
