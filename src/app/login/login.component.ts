import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [LoginService]
})
export class LoginComponent
{
  welcome = "Welcome";
  username;
  password;

  constructor(private loginService: LoginService, private router: Router) {}

  login(){
    this.loginService.login(this.username, this.password)
  }
}
