import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NavController, Events } from "ionic-angular";

import { TabsPage } from "./../tabs";
import { ForgotPasswordPage } from "./../forgot-password";
import { RegisterPage } from "./../register";

import { Store } from "@ngrx/store";
import * as LoginActions from "./store/login.action";
import { ResendValidationPage } from "../resend-validation/resend-validation";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  loginForm: FormGroup;
  constructor(
    private _navCtrl: NavController,
    private _events: Events,
    private _fb: FormBuilder,
    private _store: Store<any>
  ) {
    this.createForm();
  }

  /**
   * IF the Page has benn loaded
   * Subscribe tp the events login:success
   */
  ionViewWillEnter() {
    this._events.subscribe("login:success", isOk => {
      if (isOk) {
        this._navCtrl.setRoot(TabsPage);
      } else {
        this._navCtrl.push(ResendValidationPage);
      }
    });
  }

  /**
   * If the page leave unsubscribe to the events login:success to free some memory and avoid memory leaks
   */
  ionViewWillLeave() {
    this._events.unsubscribe("login:success");
  }

  /**
   * This methos will create form in start up of page
   */
  createForm() {
    this.loginForm = this._fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  /**
   * Login Method that will dispatch an action to authenticate the value provided in the form
   */
  login() {
    this._store.dispatch(new LoginActions.Login(this.loginForm.value));
  }

  /**
   * This method will push the ForgotPasswordPage in to the view
   */
  forgotPassword() {
    this._navCtrl.push(ForgotPasswordPage);
  }

  /**
   * This method will push the RegisterPAge in to the view
   */
  register() {
    this._navCtrl.push(RegisterPage);
  }
}
