import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { RestProvider } from '../../providers/rest';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public restProvider: RestProvider, private inAppBrowser: InAppBrowser) {
  }

  openWebpage(url: string) {
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    const browser = this.inAppBrowser.create(url, '_self', options);
    browser.close
  }

  loginWithGitHub() {
     this.openWebpage(this.restProvider.oauth2Url);
  }

  goRegister() {
    this.navCtrl.push(RegisterPage);
  }

  goLogin() {
    this.navCtrl.push(LoginPage);
  }
}
