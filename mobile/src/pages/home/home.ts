import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RegisterPage } from '../register/register';
import { LoginPage } from '../login/login';
import { RestProvider } from '../../providers/rest';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { ProductsExplorerPage } from '../products-explorer/products-explorer';
import { IdentityProvider } from '../../providers/identity';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public restProvider: RestProvider, private inAppBrowser: InAppBrowser, 
    private navParams: NavParams, public identityProvider: IdentityProvider) {
    if (navParams.get('token')) {
      this.identityProvider.setUserIdentity(navParams.get('token'), navParams.get('email'));
      this.navCtrl.push(ProductsExplorerPage);
    }  
  }


  public openWebpage(url: string): void {
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    const browser = this.inAppBrowser.create(url, '_system', options);
    browser.close
  }

  public loginWithGitHub(): void {
    this.openWebpage(this.restProvider.oauth2Url);
  }

  public goRegister(): void {
    this.navCtrl.push(RegisterPage);
  }

  public goLogin(): void {
    this.navCtrl.push(LoginPage);
  }
}
