import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { appRouterProviders } from './app/app.route';
import { HTTP_PROVIDERS } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [HTTP_PROVIDERS, appRouterProviders,  {provide: LocationStrategy, useClass: HashLocationStrategy}]);
