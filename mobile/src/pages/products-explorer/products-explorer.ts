import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProductInfoPage } from '../product-info/product-info';
import { AddProductPage } from '../add-product/add-product';
import { RestProvider } from '../../providers/rest';
import { IdentityProvider } from '../../providers/identity';


export class Product {
    id: number;
    manufacturer_name: string;
    model_name: string;
    price: number;
    quantity: number;
}

@Component({
  selector: 'page-products-explorer',
  templateUrl: 'products-explorer.html'
})
export class ProductsExplorerPage {

  productsList: Array<Product>;

  constructor(public navCtrl: NavController, public restProvider: RestProvider, private identityProvider: IdentityProvider) {

  }

  ionViewDidEnter() {
    this.restProvider.getResources().then(value =>
      this.productsList = value['products']);
  }

  itemClicked(item): void {
    this.navCtrl.push(ProductInfoPage, item);
  }


  addNewProduct() {
    this.navCtrl.push(AddProductPage);
  }

  logOut() {
    this.restProvider.logOut();
    this.identityProvider.deleteIdentity();
    this.navCtrl.push(HomePage);
  }
}
