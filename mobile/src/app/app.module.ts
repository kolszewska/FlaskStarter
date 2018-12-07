import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Deeplinks } from '@ionic-native/deeplinks';
import { JwtHelperService } from '@auth0/angular-jwt';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { ProductsExplorerPage } from '../pages/products-explorer/products-explorer';
import { RestProvider } from '../providers/rest';
import { StorageProvider } from '../providers/storage';
import { NetworkProvider } from '../providers/network';
import { ProductInfoPage } from '../pages/product-info/product-info';
import { AddProductPage } from '../pages/add-product/add-product';
import { IdentityProvider } from '../providers/identity';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage,
    ProductsExplorerPage,
    ProductInfoPage,
    AddProductPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    LoginPage,
    ProductsExplorerPage,
    ProductInfoPage,
    AddProductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    IdentityProvider,
    StorageProvider,
    NetworkProvider,
    Deeplinks,
    InAppBrowser,
    Network,
    JwtHelperService
  ]
})
export class AppModule {}
