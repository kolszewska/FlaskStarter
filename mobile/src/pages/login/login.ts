import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductsExplorerPage } from '../products-explorer/products-explorer';
import { RestProvider } from '../../providers/rest';
import { IdentityProvider } from '../../providers/identity';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    email: string;
    password: string;

    constructor(public navCtrl: NavController, public restProvider: RestProvider, public identityProvider: IdentityProvider) {

    }

    logIn() {
        this.restProvider.logIn(this.email, this.password).then(value => {
            this.identityProvider.setUserIdentity(value['token']);
            this.navCtrl.push(ProductsExplorerPage);
        });
    }
}
