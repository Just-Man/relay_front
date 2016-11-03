import { Injectable } from '@angular/core';
import { TransferService } from './transfer.service'

@Injectable()
export class RelayService
{

constructor(private transferService:TransferService)
  {
  }

  getStatus()
  {
    var path = '/status';
    return this.transferService.getRequest(path)
  }

  setRelay(relay)
  {
    var
      path  = '/set/' + relay.id,
      token = TransferService.getFromStorage('token'),
      data  = "relay=" + JSON.stringify(relay) + "&token=" + JSON.stringify(token);

    return this.transferService.postRequest(data, path, false)
  }
}
