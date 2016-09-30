/**
 * Created by just on 19.09.16.
 */
import { Injectable }     from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import globals = require('../globals');
import 'rxjs/add/operator/map'
import 'rxjs/Rx'

@Injectable()

export class TransferService
{

  status;

  constructor(private http:Http)
  {
  }

  postRequest(data, path, save)
  {
    var
      url,
      headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'q=0.8;application/json;q=0.9');

    let options = new RequestOptions({ headers: headers, method: "post" });

    url = globals.url + path;

    return this.http.post(url, data, options)
      .map(res =>
      {
        return res.json()
      })
      .map((result) =>
      {
        if (save && result.token) {
          TransferService.saveToken('token', JSON.stringify(result.token));
        }

        return result
      })
      .catch(TransferService.handleError)
  }

  static saveToken(key, value)
  {
    try {
      localStorage.setItem(key, value);
    }
    catch (e) {
      sessionStorage.setItem(key, value);
    }
  }

  static getToken(key)
  {
    return localStorage.getItem(key) ?
      localStorage.getItem(key) :
      sessionStorage.getItem(key);
  }

  getRequest(path)
  {
    var
      url,
      token   = TransferService.getToken('token'),
      headers = new Headers();

    console.log(token);

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'q=0.8;application/json;q=0.9');

    let options = new RequestOptions({ headers: headers, method: "get" });

    url = globals.url + '/' + path + '?token=' + token;

    return this.http.get(url, options)
      .map(
        (res:Response) =>
        {
          return res.json()
        }
      )
      .map((result) =>
      {
        if (typeof result == 'object' && !result.error) {
          var i,
              relay = [],
              resultArray,
              len   = Object.keys(result.data).length;

          if (typeof resultArray == 'undefined') {
            resultArray = [];
          }

          for (i = 0; i < len; i += 1) {
            resultArray.push(result.data[i]);
            relay = [];
          }

          resultArray['username'] = result.user[1];
          resultArray['admin']    = result.user[2];
          return resultArray;
        }
        return result;
      })
      .catch(TransferService.handleError);
  }

  private static handleError(error)
  {
    console.error(error); // log to console instead

    return Observable.throw(error.error || 'Server error');
  }

}
