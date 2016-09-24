import { Injectable }     from '@angular/core';
import { TransferService } from './transfer.service'
import { Router } from "@angular/router";

@Injectable()
export class LoginService
{

  constructor(private transferService: TransferService, private router: Router)
  {
  }

  login (username, password)
  {

    var
      path = '/login',
      data =
      {
        username: username,
        password: password
      };

    this.transferService.postRequest(data,path, true);
  }

  logout()
  {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
