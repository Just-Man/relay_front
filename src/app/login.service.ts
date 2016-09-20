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
      data = JSON.stringify(
      {
        username: username,
        password: password
      }
    );

    this.transferService.postRequest(data,path);
  }
  
  logout()
  {
    var path = '/logout';
    return this.transferService.getRequest(path);
  }

}
