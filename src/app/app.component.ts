import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Platform, Events, NavController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Storage } from "@ionic/storage";

import { LoginPage } from "./../pages/login";
import { TabsPage } from "./../pages/tabs";

import { Store } from "@ngrx/store";
import * as fromUserStore from "./../user-store/user.reducer";
import * as UserActions from "./../user-store/user.action";
import { UserConfigService } from "./../user-store/services";
import { UserConfig } from "./../user-store/models/user.model";

import * as LoginActions from "./../pages/login/store/login.action";

@Component({
  templateUrl: "app.html"
})
export class MyApp implements OnInit, OnDestroy {
  rootPage: any;
  @ViewChild("nav") nav: NavController;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private _store: Store<fromUserStore.State>,
    private _loginStore: Store<any>,
    private _service: UserConfigService,
    private _storage: Storage,
    private _events: Events
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      splashScreen.hide();
    });
  }

  ngOnInit() {
    this._storage.ready().then(() => {
      this.setUserInitialState();
    });

    this._events.subscribe("token:valid", isValid => {
      if (isValid) {
        this.nav.setRoot(TabsPage);
      } else {
        this.nav.setRoot(LoginPage);
      }
    });
  }

  ngOnDestroy() {
    this._events.unsubscribe("token:valid");
  }

  setUserInitialState() {
    let data: UserConfig = {
      userId: null,
      token: null,
      email: null,
      fullName: null,
      profilePicture: null,
      contactNumber: null,
      role: null,
      refreshToken: null
    };

    this._storage
      .forEach((val, key) => {
        if (data.hasOwnProperty(key)) {
          data[key] = val;
        }
      })
      .then(res => {
        this._store.dispatch(new UserActions.SetUserConfig(data));
        this._loginStore.dispatch(new LoginActions.ValidateToken());
      });
  }
}
