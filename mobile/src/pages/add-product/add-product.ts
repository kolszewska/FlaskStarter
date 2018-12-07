import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RestProvider } from '../../providers/rest';
import { ProductsExplorerPage } from '../products-explorer/products-explorer';
import { NetworkProvider } from '../../providers/network';


@Component({
    selector: 'page-add-product',
    templateUrl: 'add-product.html'
})
export class AddProductPage {

    manufacturerName: string;
    modelName: string;
    price: number;
    isConnectedToNetwork: boolean;

    constructor(public navCtrl: NavController, public restProvider: RestProvider, private networkProvider: NetworkProvider) {}

    public ionViewDidEnter(): void {
        this.isConnectedToNetwork = this.networkProvider.isConnected();
    }

    addProduct() {
        if (this.isConnectedToNetwork) {
            this.restProvider.addResource(this.manufacturerName, this.modelName, this.price);
            this.navCtrl.push(ProductsExplorerPage);
        } else {
            // TODO: add operation to stack
        }
    }
}