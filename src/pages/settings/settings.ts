import { Component } from "@angular/core";
import { Events, App } from "ionic-angular";

import { Storage } from "@ionic/storage";

import { LoginPage } from "./../login/login";

@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage {
  constructor(
    private _events: Events,
    private _storage: Storage,
    private _app: App
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SettingsPage");
  }

  logout() {
    this._storage.clear();
    this._app.getRootNav().setRoot(LoginPage);
  }
}
