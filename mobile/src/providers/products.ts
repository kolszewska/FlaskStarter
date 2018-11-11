import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductsProvider {

    lists: any = [
        {
            itemName: 'Milk',
            price: "$1.98",
            size: 'Gallon'
        },
        {
            itemName: 'Cheese',
            price: "$2.98 lb",
            size: 'One Pound'
        },
        {
            itemName: 'Yogurt',
            price: "$3.98",
            size: 'Pint'
        },
        {
            itemName: 'Bread',
            price: "$2.98",
            size: 'Loaf'
        }
    ];

    constructor() {
        console.log('Hello ProductsProvider Provider');
    }

}