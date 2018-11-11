import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

    username:string;
    password:string;

  constructor(public navCtrl: NavController) {

  }

  logIn() {
      console.log("Username:" + this.username);
      console.log("Password:" + this.password);
  }

}
