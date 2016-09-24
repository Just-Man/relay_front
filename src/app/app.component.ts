import { Component, ViewContainerRef, ViewEncapsulation  } from '@angular/core';
import { LoginService } from './login.service';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { RelayService } from "./relay.service";
import { RelayComponent } from "./relay/";
import { TransferService } from "./transfer.service";
import { HTTP_PROVIDERS } from '@angular/http';

@Component({
  moduleId   : module.id,
  selector   : 'app-root',
  templateUrl: 'app.component.html',
  styleUrls  : ['app.component.css'],
  directives : [ROUTER_DIRECTIVES, RelayComponent],
  providers  : [LoginService, TransferService, RelayService, HTTP_PROVIDERS]
})
export class AppComponent
{
  welcome = "Welcome";
  username;
  password;
  error;

  constructor(private _loginService:LoginService, private router:Router)
  {
  }

  login()
  {
    this._loginService.login(this.username, this.password)
  }

  logout () {
    this._loginService.logout()
  }
}
