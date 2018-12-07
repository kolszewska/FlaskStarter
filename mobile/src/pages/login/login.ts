import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductsExplorerPage } from '../products-explorer/products-explorer';
import { RestProvider } from '../../providers/rest';
import { IdentityProvider } from '../../providers/identity';
import { NetworkProvider } from '../../providers/network';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    email: string;
    password: string;
    isConnectedToNetwork: boolean;

    constructor(public navCtrl: NavController, public restProvider: RestProvider, public identityProvider: IdentityProvider, 
        private networkProvider: NetworkProvider) {

    }

    public ionViewDidEnter(): void {
        this.isConnectedToNetwork = this.networkProvider.isConnected();
    }

    logIn() {
        if (this.isConnectedToNetwork) {
            this.restProvider.logIn(this.email, this.password).then(value => {
                this.identityProvider.setUserIdentity(value['token'], this.email);
                this.navCtrl.push(ProductsExplorerPage);
            });
        } else {
            // TODO: check if user is storred locally, save its token and proceed
        }
    }
}
