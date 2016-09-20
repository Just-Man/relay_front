/**
 * Created by just on 19.09.16.
 */
import { Injectable }     from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Router} from '@angular/router';
import globals = require('./globals');
import 'rxjs/add/operator/map'
import 'rxjs/Rx'
import {Observable} from "rxjs/Rx";

@Injectable()
export class TransferService {

  status;
  constructor(private http:Http, private router:Router) {
  }

  postRequest (data, path)
  {
    var
      url,
      headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    url = globals.url + path;

    this.http.post(url, data, { headers: headers })
    .map(res => res.json())
      .subscribe(
        data => this.validateData(data, true),
        error => console.log(error)
    );
  }

  validateData (data, save) {
    if (data.error) {
      console.log(data.error);
      return false;
    }
    if (save) {
      data = JSON.stringify(data);
      this.saveJwt(data);
    }

    return data
  }

  saveJwt(jwt) {
    if (jwt) {
      localStorage.setItem('token', jwt);
      this.router.navigate(['/status']);
    }
  }

  getRequest (path)
  {
    var
      url,
      token = localStorage.getItem('token');
    url = globals.url + '/' + path +'?token=' + token;

    return this.http.get(url)
      .map(
        res => res.json().data
      )
      .catch(this.handleErrorGet);
  }

  private handleErrorGet (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
