import { Component, OnInit } from '@angular/core';
import { RelayService } from '../service/relay.service';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { UserService } from "../service/user.service";

@Component({
  moduleId   : module.id,
  selector   : 'app-relay',
  templateUrl: 'relay.component.html',
  styleUrls  : ['relay.component.css'],
  directives : [ROUTER_DIRECTIVES],
  providers  : [RelayService],
})

export class RelayComponent implements OnInit
{
  relays;
  username:(string);
  is_admin:(number);
  relayModal;
  errorMsg;
  seconds;

  constructor(private relaysService:RelayService,
              private userService:UserService,
              private router:Router)
  {
  }

  ngOnInit()
  {
    this.relaysService.getStatus()
      .subscribe(res =>
        {
          this.relays   = res;
          this.username = res.username;
          this.is_admin = res.admin;
          if (res.error) {
            this.errorMsg = res.error;
            var router    = this.router;
            setTimeout(function ()
            {
              router.navigate(['/']);
            }, 10000)
          }
        }
      );
  }

  changeRelayStatus(recipient)
  {
    recipient.status = !recipient.status;

    this.relaysService.setRelay(recipient)
      .subscribe(res =>
      {
      });
  }

  setRelayTimers(recipient)
  {
    this.relaysService.setRelay(recipient)
      .subscribe(res =>
      {
        this.relays = res;
      });
  }

  openTimersModal(data)
  {
    this.relayModal = data;
  }

  users()
  {

  }

  logout()
  {
    this.userService.logout();
  }
}
