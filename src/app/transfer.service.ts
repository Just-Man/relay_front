/**
 * Created by just on 19.09.16.
 */
import { Injectable }     from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from "rxjs/Rx";
import globals = require('./globals');
import 'rxjs/add/operator/map'
import 'rxjs/Rx'

@Injectable()

export class TransferService
{

  status;

  constructor(private http:Http, private router:Router)
  {
  }

  postRequest(data, path, save)
  {
    var
      url,
      headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers, method: "post" });

    url = globals.url + path;
    this.http.post(url, data, options)
      .map(res => res.json())
      .catch(this.handleErrorGet)
      .subscribe(
        data => this.validateData(data, save),
        error => console.log(this.handleErrorGet(error))
      )
  }

  validateData(data, save)
  {
    if (!data.data) {
      this.router.navigate(['/']);
    }

    if (data.error) {
      this.handleErrorGet(data.error);
    }

    if (save) {
      data = JSON.stringify(data);
      this.saveJwt(data);
    }
    return data;
  }

  saveJwt(jwt)
  {
    if (jwt) {
      localStorage.setItem('token', jwt);
      this.router.navigate(['/status']);
    }
  }

  getRequest(path, save)
  {
    var
      url,
      token = localStorage.getItem('token');

    url = globals.url + '/' + path + '?token=' + token;

    return this.http.get(url)
      .map(
        (res:Response) =>
        {
          return res.json()
        }
      )
      .map((result) =>
      {
        var res = this.validateData(result, save);
        if (typeof res == 'object') {
          var i,
              relay = [],
              resultArray,
              len   = Object.keys(res.data).length;

          if (typeof resultArray == 'undefined') {
            resultArray = [];
          }

          for (i = 0; i < len; i += 1) {
            resultArray.push(res.data[i]);
            relay = [];
          }

          resultArray['username'] = res.user[1];
          return resultArray;
        }
      })
      .catch(this.handleErrorGet);
  }

  private handleErrorGet(error)
  {
    // console.error(error);
    return Observable.throw(error.error || 'Server error');
  }

}
