import { Injectable } from '@angular/core';
import { TransferService} from './transfer.service'


@Injectable()
export class RelayService {

  constructor(private transferService: TransferService) { }

  getStatus()
  {
    var path = '/status';
    return this.transferService.getRequest(path, false)
  }

  setRelay (data)
  {
    var
      path = '/set';
    this.transferService.postRequest(data, path)
  }
}
