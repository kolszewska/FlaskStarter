import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class IdentityProvider {

  private _userToken;
  private _isUserAdmin;
  helper = new JwtHelperService();

  constructor() {
    console.log('Hello IdentityProvider Provider');
  }

  setUserIdentity(token: string) {
    this._userToken = token;
    const decodedToken = this.helper.decodeToken(token);
    if (decodedToken['is_admin'] == 'true') {
      this._isUserAdmin = true;
    } else {
      this._isUserAdmin = false;
    }
  }

  getUserToken() {
    return this._userToken;
  }

  isUserAdmin() {
    return this._isUserAdmin;
  }

  deleteIdentity() {
    this._userToken = '';
    this._isUserAdmin = '';
  }
}
