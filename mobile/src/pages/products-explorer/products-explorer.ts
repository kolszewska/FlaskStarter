import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProductsProvider } from '../../providers/products';
import { ProductInfoPage } from '../product-info/product-info';

@Component({
  selector: 'page-products-explorer',
  templateUrl: 'products-explorer.html'
})
export class ProductsExplorerPage {

  productsList: any;

  constructor(public navCtrl: NavController, public products: ProductsProvider) {

  }

  ionViewDidLoad() {
    this.productsList = this.products.lists;
  }

  itemClicked(item):void {
    this.navCtrl.push(ProductInfoPage, item);
}

  logOut() {
    this.navCtrl.push(HomePage);
  }
}
