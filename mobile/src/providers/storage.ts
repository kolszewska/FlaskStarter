import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import {UserTokenPair} from '../models/models'
import { isUndefined } from 'ionic-angular/util/util';


@Injectable()
export class StorageProvider {

  userTokenPair: UserTokenPair;
  listOfUserTokenPairs: Array<UserTokenPair>;

  constructor(private storage: Storage) {
    console.log('Hello StorageProvider Provider');
    if (isUndefined(this.listOfUserTokenPairs)) {
      this.listOfUserTokenPairs = [];
    }
  }

  public saveTokenUserPair(email: string, token: string): void {
    this.userTokenPair = new UserTokenPair(email, token);
    this.listOfUserTokenPairs.push(this.userTokenPair);
    this.storage.set('userTokenPariList', this.listOfUserTokenPairs);
  }

  public checkIfUserHaveSavedToken(email: string): boolean {
    this.storage.get('userTokenPariList').then((val) => {
      val.forEach(element => {
        if(element.email == email) {
          return true;
        }        
      });
    });
    return false;
  }
  
}
