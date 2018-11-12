import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest';
import { ProductsExplorerPage } from '../products-explorer/products-explorer';


@Component({
    selector: 'page-add-product',
    templateUrl: 'add-product.html'
})
export class AddProductPage {

    manufacturerName: string;
    modelName: string;
    price: number;

    constructor(public navCtrl: NavController, public restProvider: RestProvider) {

    }

    addProduct() {
        this.restProvider.addResource(this.manufacturerName, this.modelName, this.price);
        this.navCtrl.push(ProductsExplorerPage);
    }
}