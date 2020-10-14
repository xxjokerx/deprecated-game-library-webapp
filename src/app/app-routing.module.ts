import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ThemeResolverService} from './components/theme/theme-resolver.service';

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: [ThemeResolverService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
