import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IdentityProvider } from './identity';


@Injectable()
export class RestProvider {

  apiUrl = "http://192.168.56.1:5000/api";
  oauth2Url = this.apiUrl + '/auth/oauth2';

  constructor(public http: HttpClient, private identityProvider: IdentityProvider) {
    console.log('Hello RestProvider Provider');
  }

  logIn(email: string, password: string) {
    let body = { 'email': email, 'password': password };
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/auth/login', body).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getResources() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/resources', { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.identityProvider.getUserToken()) }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  addResource(manufacturerName: string, modelName: string, price: number) {
    let body = { 'manufacturer_name': manufacturerName, 'model_name': modelName, 'price': price };
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/resources/add_product', body, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' +
          this.identityProvider.getUserToken())
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getUsers() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/users').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
