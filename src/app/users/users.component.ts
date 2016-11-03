import { Component, OnInit } from '@angular/core';
import { UserService } from "../service/user.service";
import { ROUTER_DIRECTIVES, Router } from "@angular/router";
import { UserModel } from "../models/UserModel"
import { refresh } from "../globals"
import { TransferService } from "../service/transfer.service";
@Component({
  moduleId   : module.id,
  selector   : 'app-users',
  templateUrl: 'users.component.html',
  styleUrls  : ['users.component.css'],
  directives : [ROUTER_DIRECTIVES]
})
export class UsersComponent implements OnInit
{
  loggedUser;
  users;
  seconds;
  errorMsg;
  logs;
  newUser = UserModel;

  constructor(private userService:UserService, private router:Router)
  {
  }

  ngOnInit()
  {
    this.loggedUser = JSON.parse(TransferService.getFromStorage('user'));

    if (this.loggedUser.is_admin)
    {
      this.getUsers();
    } else {
      this.router.navigate(['status']);
    }
  }

  getUsers()
  {
    this.userService.getUsers()
      .subscribe(users =>
      {
        if (users.error) {
          this.errorMsg = users.error;
          this.countDownTimer(refresh);
          setTimeout(() =>
          {
            this.router.navigate(['/']);
          }, refresh * 1000)

        }
        this.users = users;
      }
    )
  }

  countDownTimer(time)
  {
    if (time == 0) {
      return
    }

    this.seconds = time;

    setTimeout(() =>
    {
      this.countDownTimer(time - 1);
    }, 1000);
  }

  saveUser(user)
  {
    this.userService.saveUser(user, "/create")
      .subscribe(user =>
      {
        if (user.error) {
          this.errorMsg = user.error;
          this.countDownTimer(refresh);

          setTimeout(() =>
          {
            this.router.navigate(['/']);
          }, refresh * 1000)
        }
        this.users = this.getUsers();
      }
    );
  }

  editUser(user)
  {
    this.userService.saveUser(user, "/update")
      .subscribe(user =>
      {
        if (user.error) {
          this.errorMsg = user.error;
          this.countDownTimer(refresh);

          setTimeout(() =>
          {
            this.router.navigate(['/']);
          }, refresh * 1000)
        }
        this.users = this.getUsers();
      }
    );
  }

  getLog(user)
  {
    this.userService.getUsersLog(user)
      .subscribe(log =>
      {
        this.logs = log.data;
        var btn   = document.getElementById("openLogModal");
        btn.click();
        if (log.error) {
          this.errorMsg = log.error;
          TransferService.closeAllModalIfError();
          this.countDownTimer(refresh);

          setTimeout(() =>
          {
            this.router.navigate(['/']);
          }, refresh * 1000)
        }
      }
    )
  }

  deleteUser(user)
  {
    this.userService.deleteUser(user)
      .subscribe(user =>
      {
        if (user.error) {
          this.errorMsg = user.error;
          this.countDownTimer(refresh);

          setTimeout(() =>
          {
            this.router.navigate(['/']);
          }, refresh * 1000)
        }
        this.users = this.getUsers();
      }
    );
  }
}
