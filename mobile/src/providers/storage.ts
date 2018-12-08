import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { isUndefined } from 'ionic-angular/util/util';

import {UserTokenPair, Product} from '../models/models'


@Injectable()
export class StorageProvider {

  constructor(private storage: Storage) {
    console.log('Hello StorageProvider Provider');
  }

  public saveTokenUserPair(email: string, token: string): void {
      console.log("StorageProvider | Save user-token pair with email: " + email);
      this.storage.get('userTokenPairList').then((data => {
        var listOfUserTokenPairs;
        data == null ? listOfUserTokenPairs = [] : listOfUserTokenPairs = data;
        const userTokenPair = new UserTokenPair(email, token);
        listOfUserTokenPairs.push(userTokenPair);
        this.storage.set('userTokenPairList', listOfUserTokenPairs);
      }));
  }

  public returnTokenForUser(email: string) : Promise<any> {
    console.log("StorageProvider | Get token for user with email: " + email);
    return new Promise((resolve) => {
      this.storage.get('userTokenPairList').then((data) => {
        if(data == null) {return null;}
        data.forEach(element => {
          if(element.email === email) {
            resolve(element.token);
          }        
        });
      }).catch((err) => {
        console.log(err);
      })
    })
  }

  public saveResources(productList: Array<Product>): void {
      console.log("StorageProvider | Saving products locally on device");
      console.log(productList);
      this.storage.set('productsList', productList);
  }

  public getResources(): Promise<Array<Product>> {
    console.log("StorageProvider | Get list of products from local storage");
    return new Promise((resolve) => {
      this.storage.get('productsList').then((data) => {
        if(data == null) {return null;}
        resolve(data);
      }).catch((err) => {
        console.log(err);
      })
    })
  }
}
