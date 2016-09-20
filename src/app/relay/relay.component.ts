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
  relays1;

  constructor(private relaysService: RelayService) { }

  ngOnInit() {
    this.relaysService.getStatus()
      .subscribe(res => {return this.relays = res.data});

    console.log(this.relays);
  }


}
