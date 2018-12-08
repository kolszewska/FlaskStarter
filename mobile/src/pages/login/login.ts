import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { ProductsExplorerPage } from '../products-explorer/products-explorer';
import { RestProvider } from '../../providers/rest';
import { IdentityProvider } from '../../providers/identity';
import { NetworkProvider } from '../../providers/network';
import { StorageProvider } from '../../providers/storage';
import { isUndefined } from 'ionic-angular/util/util';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    email: string;
    password: string;
    isConnectedToNetwork: boolean;

    constructor(public navCtrl: NavController, public restProvider: RestProvider, public identityProvider: IdentityProvider, 
        private networkProvider: NetworkProvider, private storageProvider: StorageProvider, private alertController: AlertController) {

    }

    public ionViewDidEnter(): void {
        this.isConnectedToNetwork = this.networkProvider.isConnected();
    }

    private handleOfflineLogin(): void {
        console.log("Login | Offline login")
        this.storageProvider.returnTokenForUser(this.email).then((token) =>{
            if (isUndefined(token) || token == null) {
                let alert = this.alertController.create({
                    title: 'Error!',
                    subTitle: 'Connect to inernet first to be able to log in offline!',
                    buttons: ['Ok']
                });        
                alert.present();
            } else {
                this.identityProvider.setUserIdentity(token, this.email);
                this.navCtrl.push(ProductsExplorerPage);
            }
        })
    }

    public logIn(): void {
        if (this.isConnectedToNetwork) {
            console.log("Login | Login with server")
            this.restProvider.logIn(this.email, this.password).then(value => {
                this.identityProvider.setUserIdentity(value['token'], this.email);
                this.navCtrl.push(ProductsExplorerPage);
            });
        } else {
            this.handleOfflineLogin()
        }
    }
}
