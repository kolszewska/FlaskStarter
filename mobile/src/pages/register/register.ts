import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { RestProvider } from '../../providers/rest';
import { IdentityProvider } from '../../providers/identity';
import { LoginPage } from '../login/login';
import { NetworkProvider } from '../../providers/network';

@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {

    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    isConnectedToNetwork: boolean;

    constructor(public navCtrl: NavController, public restProvider: RestProvider, private identityProvider: IdentityProvider, 
        private networkProvider: NetworkProvider, private alertController: AlertController) {

    }

    public ionViewDidEnter(): void {
        this.isConnectedToNetwork = this.networkProvider.isConnected();
    }

    public register(): void {
        if(this.isConnectedToNetwork) {
            this.restProvider.register(this.username, this.email, this.password);
            this.navCtrl.push(LoginPage);
        } else {
            let alert = this.alertController.create({
                title: 'Error!',
                subTitle: 'Connect to inernet to be able to register!',
                buttons: ['Ok']
            });
            alert.present();
        }
    }
}
