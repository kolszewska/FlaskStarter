import {Observable } from 'rxjs';
import {_throw} from 'rxjs/observable/throw';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {concat, delay, map, retryWhen, take} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

import { IdentityProvider } from './identity';


@Injectable()
export class RestProvider {

  apiUrl = "http://10.0.2.2:5000/api";
  oauth2Url = this.apiUrl + '/auth/oauth2';

  uuidv1 = require('uuid/v1');

  constructor(public http: HttpClient, private identityProvider: IdentityProvider) {
    console.log('Hello RestProvider Provider');
  }

  synchronizeWithServer(operationsList: any[]) {
    return new Promise((resolve, reject) => {
        let body = { 'operations': operationsList, 'id': this.uuidv1() };
        let retryAttempt = 0;
        this.http.post(this.apiUrl + '/resources/sync', body, { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.identityProvider.getUserToken()) })
            .pipe(
                retryWhen((error: Observable<HttpErrorResponse>) => {
                    return error.pipe(
                        map((scanRequestError: HttpErrorResponse) => {
                            console.warn('Retrying request for syncing (attempt: ' + (++retryAttempt) + ').');
                            return of(scanRequestError.status);
                        }),
                        delay(5000), // Let's give it a try after 5 seconds
                        take(5), // Let's give it 5 retries (each after 5 seconds)
                        concat(_throw({error: 'Unable to sync.'}))
                    );
                })
            ).toPromise().then(
            (response: any) => {
                resolve(response);
            },
            (error: HttpErrorResponse) => {
                reject(error);
            }
        );
    });
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

  logOut() {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/auth/logout', '', {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.identityProvider.getUserToken())
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  register(username: string, email: string, password: string) {
    return new Promise(resolve => {
      let body = { 'username': username, 'email': email, 'password': password };
      this.http.post(this.apiUrl + '/auth/register', body, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.identityProvider.getUserToken())
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getResources() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/resources', {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.identityProvider.getUserToken())
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  addResource(manufacturerName: string, modelName: string, price: number) {
    console.log(manufacturerName + modelName + price);
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

  increaseQuantity(id: string, amount: number) {
    let body = { 'amount': amount };
    return new Promise(resolve => {
      this.http.patch(this.apiUrl + '/resources/increase_quantity/' + id, body, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' +
          this.identityProvider.getUserToken())
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  decreaseQuantity(id: string, amount: number) {
    let body = { 'amount': amount };
    return new Promise(resolve => {
      this.http.patch(this.apiUrl + '/resources/decrease_quantity/' + id, body, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' +
          this.identityProvider.getUserToken())
      }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  deleteProduct(id: string) {
    return new Promise(resolve => {
      this.http.delete(this.apiUrl + '/resources/remove_product/' + id, {
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
