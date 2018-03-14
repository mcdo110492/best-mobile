import { Injectable } from "@angular/core";

import Echo from "laravel-echo"; // Laravel Echo

//import { environment } from "@app/env/environment";

import { environment } from "./../environments/environment";

/**
 * Helper Service to connect your app to laravel broadcaster using Laravel-echo
 *
 */

@Injectable()
export class LaravelEchoService {
  echo: any;
  private _credentials = environment.pusherCredentials;
  private _api = environment.api;

  initConnection(token?: any) {
    this.echo = new Echo({
      broadcaster: this._credentials.broadcaster,
      key: this._credentials.key,
      cluster: this._credentials.cluster,
      encrypted: this._credentials.encrypted,
      authEndpoint: `${this._api}/broadcasting/auth?token=${token}`
      // auth: {
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // }
    });

    return this.echo;
  }
}
