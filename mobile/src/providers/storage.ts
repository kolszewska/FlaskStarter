import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

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


  public deleteTokenUserPair(token: string): void {
    console.log("StorageProvider | Delete user-token pair");
    this.storage.get('userTokenPairList').then((data => {
      var userIndex = data.findIndex(userTokenPair => userTokenPair.token == token);
      delete data[userIndex];
      this.storage.set('userTokenPairList', data);
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
    return new Promise((resolve, reject) => {
      this.storage.get('productsList').then((data) => {
        resolve(data);
      }).catch((err) => {
        console.log(err);
      })
    })
  }

  public increaseLocalQuantity(productId: string, quantityChange: number): Promise<any> {
    console.log("StorageProvider | Increase Quantity for product with id: " + productId);
      return new Promise((resolve) => {
        this.storage.get('productsList').then((data) => {
          var productIndex = data.findIndex(product => product.id == productId);
          var productToBeUpdated = data[productIndex];
          productToBeUpdated.quantity = +productToBeUpdated.quantity + +quantityChange;
          data[productId] = productToBeUpdated;
          this.storage.set('productsList', data);
          // TODO: add operation to list of operations
          resolve(productToBeUpdated.quantity);
      })
    })
  }

  public decreeaseLocalQuantity(productId: string, quantityChange: number): Promise<any> {
    console.log("StorageProvider | Decrease Quantity for product with id: " + productId);
      return new Promise((resolve) => {
        this.storage.get('productsList').then((data) => {
          var productIndex = data.findIndex(product => product.id == productId);
          var productToBeUpdated = data[productIndex];
          if(+productToBeUpdated.quantity - +quantityChange >= 0) {
            productToBeUpdated.quantity = +productToBeUpdated.quantity - +quantityChange;
            data[productId] = productToBeUpdated;
            this.storage.set('productsList', data);
            // TODO: add operation to list of operations
            resolve(productToBeUpdated.quantity);
          }
          resolve(productToBeUpdated.quantity);
      })
    })
  }

  public removeLocally(productId: string): void {
    console.log("StorageProvider | Remove product with id: " + productId);
    this.storage.get('productsList').then((data => {
      var productIndex = data.findIndex(product => product.id == productId);
      delete data[productIndex];
      this.storage.set('productsList', data);
      // TODO: add operation to list of operations
    }));
  }

  public addLocally(manufacturerName: string, modelName: string, price: number): void {
    console.log("StorageProvider | Add new product");
    this.storage.get('productsList').then((data => {
      const lastId = data(data[data.length-1]).id;
      var newProduct = new Product(manufacturerName, modelName, price, 0);
      newProduct.id = lastId + 1;
      data.push(newProduct);
      data.array.forEach(element => {
        console.log(element);
      });
      this.storage.set('productsList', data);
      // TODO: add operation to list of operations
    }));
  }
}
