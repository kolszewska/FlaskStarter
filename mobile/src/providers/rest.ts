import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class RestProvider {

  apiUrl = "http://192.168.56.1:5000/api";
  oauth2Url = this.apiUrl + '/auth/oauth2';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }
  
  getUsers() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/users').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
