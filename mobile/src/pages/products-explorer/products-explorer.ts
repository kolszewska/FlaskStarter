import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProductInfoPage } from '../product-info/product-info';
import { AddProductPage } from '../add-product/add-product';
import { RestProvider } from '../../providers/rest';
import { IdentityProvider } from '../../providers/identity';
import { NetworkProvider } from '../../providers/network';
import { Product } from '../../models/models'; 
import { StorageProvider } from '../../providers/storage';


@Component({
  selector: 'page-products-explorer',
  templateUrl: 'products-explorer.html'
})
export class ProductsExplorerPage {

  productsList: Array<Product>;
  isConnectedToNetwork: boolean;

  constructor(public navCtrl: NavController, public restProvider: RestProvider, private identityProvider: IdentityProvider,
     private networkProvider: NetworkProvider, private storageProvider: StorageProvider) {
  }

  public ionViewDidEnter(): void {
    this.isConnectedToNetwork = this.networkProvider.isConnected();
    if(this.isConnectedToNetwork) {
      console.log("Products-Explorer | Get products from server");
      this.restProvider.getResources().then(value =>
        this.productsList = value['products']);
      } else {
        console.log("Products-Explorer | Get products from local storage");
        this.productsList = this.storageProvider.getResources();
        console.log(this.productsList);
      }
  }

  public itemClicked(item): void {
    this.navCtrl.push(ProductInfoPage, item);
  }


  public addNewProduct(): void {
    this.navCtrl.push(AddProductPage);
  }

  public logOut(): void {
    this.restProvider.logOut();
    this.identityProvider.deleteIdentity();
    this.navCtrl.push(HomePage);
  }
}
