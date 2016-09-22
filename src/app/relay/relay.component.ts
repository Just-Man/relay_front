import { Component, OnInit } from '@angular/core';
import { RelayService } from '../relay.service';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'app-relay',
  templateUrl: 'relay.component.html',
  styleUrls: ['relay.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ RelayService ]
})
export class RelayComponent implements OnInit {
  relays;
  username;

  constructor(private relaysService: RelayService) { }

  ngOnInit() {
    this.relaysService.getStatus()
      .subscribe(res => {
        this.relays = res;
        this.username = res.username;
      });
  }
}
