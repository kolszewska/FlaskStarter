import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest';
import { IdentityProvider } from '../../providers/identity';
import { LoginPage } from '../login/login';

@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {

    username: string;
    email: string;
    password: string;
    confirmPassword: string;

    constructor(public navCtrl: NavController, public restProvider: RestProvider, private identityProvider: IdentityProvider) {

    }

    register() {
        this.restProvider.register(this.username, this.email, this.password);
        this.navCtrl.push(LoginPage);
    }
}
