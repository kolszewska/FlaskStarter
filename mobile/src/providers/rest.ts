import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IdentityProvider } from './identity';


@Injectable()
export class RestProvider {

  apiUrl = "http://10.0.2.2:5000/api";
  oauth2Url = this.apiUrl + '/auth/oauth2';

  constructor(public http: HttpClient, private identityProvider: IdentityProvider) {
    console.log('Hello RestProvider Provider');
  }


  public synchronizeWithServer(operationsList: any[]) {
    return new Promise(resolve => {
        operationsList.forEach(operation => {
        var name = operation["name"];
        switch(name) {
          case "add": {
            console.log("RestProvider | Synchronization | Add product");
            this.addResource(operation["manufacturer_name"], operation["model_name"], operation["price"]);
            break;
          }
          case "remove": {
            console.log("RestProvider | Synchronization | Remove product");
            this.deleteProduct(operation["id"]);
            break;
          }
          case "increase": {
            console.log("RestProvider | Synchronization | Increase quantity");
            this.increaseQuantity(operation["id"], operation["amount"]);
            break;
          }
          case "decrease": {
            console.log("RestProvider | Synchronization | Decrease quantity");
            this.decreaseQuantity(operation["id"], operation["amount"]);
            break;
          }
          default: {
            console.log("RestProvider | Synchronization | Operation not recognized");
          }
        }
      })
      resolve(true);
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
