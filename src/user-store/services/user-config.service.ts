import { Injectable } from "@angular/core";

import { Storage } from "@ionic/storage";
import { UserConfig } from "../models/user.model";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

@Injectable()
export class UserConfigService {
  constructor(private _storage: Storage) {}

  setUserCredentials(data: UserConfig) {
    this._storage.ready().then(() => {
      this.setStorage("userId", data.userId);
      this.setStorage("token", data.token);
      this.setStorage("email", data.email);
      this.setStorage("fullName", data.fullName);
      this.setStorage("contactNumber", data.contactNumber);
      this.setStorage("profilePicture", data.profilePicture);
      this.setStorage("refreshToken", data.refreshToken);
      this.setStorage("role", data.role);
    });
  }

  clearUserConfig() {
    this._storage.ready().then(() => {
      this._storage.clear().then(() => {
        console.log("Storage Data has been cleared");
      });
    });
  }

  private setStorage(key: string, value: any) {
    this._storage.set(key, value);
  }
}
