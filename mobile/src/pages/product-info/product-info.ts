import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IdentityProvider } from '../../providers/identity';
import { RestProvider } from '../../providers/rest';
import { ProductsExplorerPage } from '../products-explorer/products-explorer';

@Component({
    selector: 'page-product-info',
    templateUrl: 'product-info.html'
})
export class ProductInfoPage {

    itemInfo: any;
    canDelete: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, private identityProvider: IdentityProvider) {
        this.itemInfo = this.navParams.data;
    }

    ionViewDidEnter() {
        this.canDelete = this.identityProvider.isUserAdmin();
        console.log('ionViewDidEnter InfoPage');
    }

    increaseQuantity(itemInfo, increaseAmount) {
        this.restProvider.increaseQuantity(itemInfo.id, increaseAmount).then(data => {
            this.itemInfo.quantity = data['new_quantity'];
        });

    }

    decreaseQuantity(itemInfo, decreaseAmount) {
        this.restProvider.decreaseQuantity(itemInfo.id, decreaseAmount).then(data => {
            this.itemInfo.quantity = data['new_quantity'];
        });
    }

    deleteProduct(itemInfo) {
        this.restProvider.deleteProduct(itemInfo.id);
        this.navCtrl.push(ProductsExplorerPage);
    }
}