import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';

@Injectable()
export class NetworkProvider {

  private _isConnectedToNetwork;

  constructor(private network: Network) {
    console.log('Hello NetworkProvider Provider');

    this.network.onDisconnect().subscribe(() => {
      console.log('Network was disconnected!');
      this._isConnectedToNetwork = false;
    });

    this.network.onConnect().subscribe(() => {
      console.log('Network connection is back again!');
      this,this._isConnectedToNetwork = true;
    });
  }

  public isConnected(): boolean {
    return this._isConnectedToNetwork;
  }
}
