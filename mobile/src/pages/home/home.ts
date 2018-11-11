import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  loginWithGitHub() {
    return 'hello';
  }

  goRegister() {
    this.navCtrl.push(RegisterPage);
  }

  goLogin() {
    this.navCtrl.push(LoginPage);
  }
}
