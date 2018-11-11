import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-product-info',
    templateUrl: 'product-info.html'
})
export class ProductInfoPage {

    itemInfo: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.itemInfo = this.navParams.data;
        console.log(this.itemInfo);
    }

    ionViewDidLoad() {
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