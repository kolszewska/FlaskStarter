import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import {UserTokenPair, Product} from '../models/models'
import { isRightSide } from 'ionic-angular/umd/util/util';


@Injectable()
export class StorageProvider {

  constructor(private storage: Storage) {
    console.log('Hello StorageProvider Provider');
  }

  public saveTokenUserPair(email: string, token: string): void {
      console.log("StorageProvider | save user-token pair " + email)
      this.storage.get('userTokenPairList').then((data => {
        var listOfUserTokenPairs;
        data == null ? listOfUserTokenPairs = [] : listOfUserTokenPairs = data;
        const userTokenPair = new UserTokenPair(email, token);
        listOfUserTokenPairs.push(userTokenPair);
        this.storage.set('userTokenPairList', listOfUserTokenPairs);
      }));
  }

  public returnTokenForUser(email: string) : Promise<any> {
    console.log("StorageProvider | get token for user | " + email)
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

  public getResources(): Array<Product> {
    console.log("StorageProvider | get list of products");
    this.storage.get('listOfProducts').then((val => {
      return val;
    }))
    return [];
  }
}
