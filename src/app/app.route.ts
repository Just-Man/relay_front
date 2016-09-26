/**
 * Created by just on 07.09.16.
 */
import { provideRouter, RouterConfig } from '@angular/router';
import { AppComponent } from './app.component'
import  { RelayComponent } from  './relay'
import  { LoginComponent } from  './login'

const routes: RouterConfig = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'status',
    component: RelayComponent
  },
  { path: "**",
    redirectTo:''
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];
