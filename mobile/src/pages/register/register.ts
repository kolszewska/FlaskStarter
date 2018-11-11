import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {

    username: string;
    email: string;
    password: string;
    confirmPassword: string;

    constructor(public navCtrl: NavController) {

    }

    register() {
        console.log("Username:" + this.username);
        console.log("Email:" + this.email);
        console.log("Password:" + this.password);
        console.log("Confirm:" + this.confirmPassword);
    }
}
