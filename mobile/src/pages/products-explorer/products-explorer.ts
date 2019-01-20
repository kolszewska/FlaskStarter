import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProductInfoPage } from '../product-info/product-info';
import { AddProductPage } from '../add-product/add-product';
import { RestProvider } from '../../providers/rest';
import { IdentityProvider } from '../../providers/identity';
import { NetworkProvider } from '../../providers/network';
import { Product } from '../../models/models'; 
import { StorageProvider } from '../../providers/storage'
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-products-explorer',
  templateUrl: 'products-explorer.html'
})
export class ProductsExplorerPage {

  productsList: Array<Product>;
  isConnectedToNetwork: boolean;
  syncing: any;

  constructor(public navCtrl: NavController, public restProvider: RestProvider, private identityProvider: IdentityProvider, private alertController: AlertController,
     private networkProvider: NetworkProvider, private storageProvider: StorageProvider, public loadingController: LoadingController) {
  }

  public ionViewWillEnter(): void {
    this.isConnectedToNetwork = this.networkProvider.isConnected();
    if(this.isConnectedToNetwork) {
      console.log("Products-Explorer | Get products from server");
      this.restProvider.getResources().then((value) => {
        this.productsList = value['products']
        this.storageProvider.saveResources(this.productsList);
      });
      } else {
        console.log("Products-Explorer | Get products from local storage");
        this.storageProvider.getResources().then((products) => {
            products.forEach(element => {
              console.log(element);
            });
            this.productsList = products;
        });
      }
  }

  public sync(): void {
    console.log("Products-Explorer | Try to synchronize with server");
    this.syncing = this.loadingController.create({ content: "Syncing with server, please wait..." });
    this.syncing.present();
    this.storageProvider.getOperations().then(operations => {
      this.restProvider.synchronizeWithServer(operations).then(result => {
        console.log("Products-Explorer | Sync was succesfull!")
          this.syncing.dismissAll();
          this.storageProvider.clearOperationsListt();
      }).catch(err => {
        this.syncing.dismissAll();
        let alert = this.alertController.create({
          title: 'Error!',
          subTitle: 'Unable to synchronize with server! Try later',
          buttons: ['Ok']
      });        
        alert.present();
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })
  }

  public itemClicked(item): void {
    this.navCtrl.push(ProductInfoPage, item);
  }


  public addNewProduct(): void {
    this.navCtrl.push(AddProductPage);
  }

  public logOut(): void {
    this.restProvider.logOut();
    this.identityProvider.deleteIdentity();
    this.navCtrl.push(HomePage);
  }
}
