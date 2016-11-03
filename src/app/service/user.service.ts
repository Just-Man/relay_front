import { Injectable }     from '@angular/core';
import { TransferService } from './transfer.service'
import { Router } from "@angular/router";

@Injectable()
export class UserService
{

  constructor(private transferService: TransferService, private router: Router)
  {
  }


  path;
  users;

  login (username, password)
  {
    this.path = '/login';
    var
      data =
      {
        username: username,
        password: password
      };

    return this.transferService.postRequest(data,this.path, true);
  }

  getUsers ()
  {
    this.path = '/users';
    return this.transferService.getRequest(this.path)
  }

  getUsersLog (user)
  {
    this.path = '/log';

    var
      token = TransferService.getFromStorage('token'),
      data  = "user=" + JSON.stringify(user) + "&token=" + JSON.stringify(token);

    return this.transferService.postRequest(data, this.path, false)
  }

  saveUser(user, path)
  {
    var
      token = TransferService.getFromStorage('token'),
      data  = "user=" + JSON.stringify(user) + "&token=" + JSON.stringify(token);

    return this.transferService.postRequest(data,path, false);
  }

  deleteUser(user)
  {
    this.path = '/del';
    var
      token = TransferService.getFromStorage('token'),
      data  = "user=" + JSON.stringify(user) + "&token=" + JSON.stringify(token);

    return this.transferService.postRequest(data,this.path, false);
  }

  logout()
  {
    this.path = '/logout';

    var
      token = TransferService.getFromStorage('token'),
      data  = "token=" + JSON.stringify(token);

    TransferService.saveToStorage('token', '');

    TransferService.saveToStorage('user', '');
    this.router.navigate(['/']);

    return this.transferService.postRequest(data, this.path, false);
  }

}
