import { Component, OnInit } from '@angular/core';
import { RelayService } from '../service/relay.service';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { UserService } from "../service/user.service";
import { refresh } from "../globals"
import { TransferService } from "../service/transfer.service";
import { AppComponent } from "../app.component";

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

  constructor(private app: AppComponent,
    private relaysService:RelayService,
              private router:Router)
  {
  }

  ngOnInit ()
  {
    this.getRelaysStatus();
  }

  getRelaysStatus () {
    this.relaysService.getStatus()
      .subscribe(res =>
        {
          if (res.error) {
            this.errorMsg = res.error;
            TransferService.closeAllModalIfError();
            this.countDownTimer(refresh);

            setTimeout(() =>
            {
              this.router.navigate(['/']);
            }, refresh * 1000)
          }
          this.relays   = res;
        }
      )
    ;
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

  changeRelayStatus(recipient)
  {
    recipient.status = !recipient.status;

    this.relaysService.setRelay(recipient)
      .subscribe(res =>
      {
        if (res.error) {
          this.errorMsg = res.error;
          TransferService.closeAllModalIfError();
          this.countDownTimer(refresh);

          setTimeout(() =>
          {
            this.router.navigate(['/']);
          }, refresh * 1000)
        }
      });
  }

  setRelayTimers(recipient)
  {
    this.relaysService.setRelay(recipient)
      .subscribe(res =>
      {
        if (res.error) {
          this.errorMsg = res.error;
          TransferService.closeAllModalIfError();
          this.countDownTimer(refresh);

          setTimeout(() =>
          {
            this.router.navigate(['/']);
          }, refresh * 1000)
        }
        // this.relays = res;
      });
  }

  openTimersModal(data)
  {
    this.relayModal = data;
  }
}
