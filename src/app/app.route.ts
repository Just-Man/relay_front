/**
 * Created by just on 07.09.16.
 */
import { provideRouter, RouterConfig } from '@angular/router';
import  { RelayComponent } from  './relay'
import  { LoginComponent } from  './login'
import { UsersComponent } from "./users";
import { AccountComponent } from "./account"

const routes: RouterConfig = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'status',
    component: RelayComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'activate',
    component: AccountComponent
  },
  {
    path: 'change-password',
    component: AccountComponent
  },
  {
    path: 'forgotten-password',
    component: AccountComponent
  },
  { path: "**",
    redirectTo:''
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];
