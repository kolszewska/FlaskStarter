import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
    selector: 'page-add-product',
    templateUrl: 'add-product.html'
})
export class AddProductPage {

    manufacturerName: string;
    modelName: string;
    price: number;
    
    constructor(public navCtrl: NavController) {

    }

    addProduct() {

    }

}