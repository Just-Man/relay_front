import { Component } from '@angular/core';
import { UserService } from './service/user.service';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { RelayService } from "./service/relay.service";
import { TransferService } from "./service/transfer.service";
import { HTTP_PROVIDERS } from '@angular/http';

@Component({
  moduleId     : module.id,
  selector     : 'app-root',
  templateUrl  : 'app.component.html',
  styleUrls    : ['app.component.css'],
  directives   : [ROUTER_DIRECTIVES ],
  providers    : [UserService, TransferService, RelayService, HTTP_PROVIDERS],
})
export class AppComponent
{
}
