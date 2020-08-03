import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ThemeCountComponent} from './components/theme/theme-count/theme-count.component';

const appRoutes: Routes = [
  {path: 'themes', component: ThemeCountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
