import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

@Component({
  moduleId   : module.id,
  selector   : 'app-login',
  templateUrl: 'login.component.html',
  styleUrls  : ['login.component.css'],
  directives : [ROUTER_DIRECTIVES],
  providers  : [UserService]
})
export class LoginComponent
{
  welcome = "Welcome";
 
  username;
  password;
  error;

  constructor(private loginService:UserService, private router: Router)
  {
  }

  login()
  {
    this.loginService.login(this.username, this.password)
      .subscribe(res => {
        if (res.user) {
          this.router.navigate(['/status'])
        }
        this.error = res.error;
      });
  }
}
