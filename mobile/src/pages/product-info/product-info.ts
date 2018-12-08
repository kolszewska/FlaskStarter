import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IdentityProvider } from '../../providers/identity';
import { RestProvider } from '../../providers/rest';
import { ProductsExplorerPage } from '../products-explorer/products-explorer';
import { NetworkProvider } from '../../providers/network';
import { StorageProvider } from '../../providers/storage';

@Component({
    selector: 'page-product-info',
    templateUrl: 'product-info.html'
})
export class ProductInfoPage {

    public itemInfo: any;
    public canDelete: boolean;
    public isConnectedToNetwork: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, private identityProvider: IdentityProvider,
        private networkProvider: NetworkProvider, private storageProvider: StorageProvider) {
        this.itemInfo = this.navParams.data;
    }

    public ionViewDidEnter(): void {
        this.isConnectedToNetwork = this.networkProvider.isConnected();
        this.canDelete = this.identityProvider.isUserAdmin();
        console.log('ionViewDidEnter InfoPage');
    }

    public increaseQuantity(itemInfo, increaseAmount): void {
        if (this.isConnectedToNetwork) {
            this.restProvider.increaseQuantity(itemInfo.id, increaseAmount).then(data => {
                this.itemInfo.quantity = data['new_quantity'];
            });
        } else {
            // TODO: add operation to the stack
        }
    }

    public decreaseQuantity(itemInfo, decreaseAmount): void {
        if (this.isConnectedToNetwork) {
            this.restProvider.decreaseQuantity(itemInfo.id, decreaseAmount).then(data => {
                this.itemInfo.quantity = data['new_quantity'];
            });
        } else {
            // TODO: add operation to the stack
        }
    }

    public deleteProduct(itemInfo): void {
        if (this.isConnectedToNetwork) {
            this.restProvider.deleteProduct(itemInfo.id);
            this.navCtrl.push(ProductsExplorerPage);
        } else {
            //TODO: add operation to the  stack
        }
    }
}