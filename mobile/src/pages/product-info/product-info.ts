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
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InfoPage');
    }
}