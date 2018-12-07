import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageProvider } from './storage';

@Injectable()
export class IdentityProvider {

  private _userToken;
  private _isUserAdmin;
  helper = new JwtHelperService();

  constructor(private storageProvider: StorageProvider) {
    console.log('Hello IdentityProvider Provider');
  }

  public setUserIdentity(token: string, email: string): void {
    this._userToken = token;
    console.log(this._userToken);
    const decodedToken = this.helper.decodeToken(token);
    if (decodedToken['is_admin'] == 'true') {
      this._isUserAdmin = true;
    } else {
      this._isUserAdmin = false;
    }
    this.storageProvider.saveTokenUserPair(email, token);
  }

  public getUserToken(): string {
    return this._userToken;
  }

  public isUserAdmin(): boolean {
    return this._isUserAdmin;
  }

  public deleteIdentity(): void {
    this._userToken = '';
    this._isUserAdmin = '';
  }
}
