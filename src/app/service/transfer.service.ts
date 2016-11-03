/**
 * Created by just on 19.09.16.
 */
import { Injectable, EventEmitter }     from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Rx";
import globals = require('../globals');
import 'rxjs/add/operator/map'
import 'rxjs/Rx'
import { Router } from "@angular/router";

@Injectable()

export class TransferService
{
  loginEvent: EventEmitter<any> = new EventEmitter;
  status;

  constructor(private http:Http, private router: Router)
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
          TransferService.saveToStorage('token', JSON.stringify(result.token));
        }

        if (result.user) {
          TransferService.saveToStorage('user', JSON.stringify(result.user));
        }

        this.loginEvent.emit(JSON.parse(TransferService.getFromStorage('user')));

        return result
      })
      .catch(TransferService.handleError)
  }

  static saveToStorage(key, value)
  {
    try {
      localStorage.setItem(key, value);
    }
    catch (e) {
      sessionStorage.setItem(key, value);
    }
  }

  static getFromStorage(key)
  {
    return localStorage.getItem(key) ?
      localStorage.getItem(key) :
      sessionStorage.getItem(key);
  }

  getRequest(path)
  {
    var
      url,
      token   = TransferService.getFromStorage('token'),
      headers = new Headers();

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

          resultArray['user'] = JSON.parse(TransferService.getFromStorage('user'));

          this.loginEvent.emit(resultArray['user']);

          return resultArray;
        }
        return result;
      })
      .catch(TransferService.handleError);
  }

  static closeAllModalIfError () {
    var
      i,
      button,
      closeButtons = document.getElementsByClassName('closeBtn'),
      len = closeButtons.length;
    for (i = 0; i < len; i += 1) {
      button = closeButtons[i];
      button.click();
    }
  }

  private static handleError(error)
  {
    console.error(error); // log to console instead

    return Observable.throw(error.error || 'Server error');
  }

  getLoginEvent ()
  {
    return this.loginEvent;
  }
}
