import { Injectable }     from '@angular/core';
import { TransferService } from './transfer.service'

@Injectable()
export class LoginService
{

  constructor(private transferService: TransferService)
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
    var path = '/logout';
    return this.transferService.getRequest(path, true);
  }

}
