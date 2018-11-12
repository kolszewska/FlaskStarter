import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductsProvider {


    constructor() {
        console.log('Hello ProductsProvider Provider');
    }

    lists: any = [
        {
            manufacturerName: 'Cow',
            modelName: 'Milk',
            price: "1.98",
            quantity: 12
        },
        {
            manufacturerName: 'Cow',
            modelName: 'Cheese',
            price: "2.98",
            quantity: 13
        },
        {
            manufacturerName: 'Cow',
            modelName: 'Yogurt',
            price: "3.98",
            quantity: 33
        },
        {
            manufacturerName: 'Nature',
            modelName: 'Bread',
            price: "2.98",
            quantity: 12
        }
    ];
}