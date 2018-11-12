import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IdentityProvider } from '../../providers/identity';

@Component({
    selector: 'page-product-info',
    templateUrl: 'product-info.html'
})
export class ProductInfoPage {

    itemInfo: any;
    canDelete: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, private identityProvider: IdentityProvider) {
        this.itemInfo = this.navParams.data;
        console.log(this.itemInfo);
    }

    ionViewDidLoad() {
        this.canDelete = this.identityProvider.isUserAdmin();
        console.log('ionViewDidLoad InfoPage');
    }

    increaseQuantity(itemInfo, increaseAmount) {
        console.log("Increaase amount: " + increaseAmount);
        console.log("Item info: " + itemInfo.modelName);
    }

    decreaseQuantity(itemInfo, decreaseAmount) {
        console.log("Decrease amount: " + decreaseAmount);
        console.log("Item info: " + itemInfo.modelName);
    }
}