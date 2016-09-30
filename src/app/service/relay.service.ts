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
    return this.transferService.getRequest(path, false)
  }

  setRelay(relays)
  {
    var
      path  = '/set',
      token = TransferService.getToken('token'),
      data  = "relay=" + JSON.stringify(relays) + "&token=" + JSON.stringify(token);

    return this.transferService.postRequest(data, path, false)
  }
}
