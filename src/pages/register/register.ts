import { Component } from "@angular/core";
import {
  Events,
  NavController,
  AlertController,
  AlertOptions
} from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { PasswordMatchValidtor } from "../../config/password-match.validator";

import { Store } from "@ngrx/store";

import * as RegisterActions from "./store/register.action";

@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  registerForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _store: Store<any>,
    private _events: Events,
    private _navCtrl: NavController,
    private _alert: AlertController
  ) {
    this.createForm();
  }

  ionViewDidLoad() {
    this._events.subscribe("register:success", () => {
      this._navCtrl.pop();
    });
  }

  ionViewDidLeave() {
    this._events.unsubscribe("register:success");
  }

  signup() {
    const options: AlertOptions = {
      title: "Are you sure?",
      message: "Click Yes to sign up your email.",
      buttons: [
        {
          text: "No",
          role: "no",
          handler: () => {}
        },
        {
          text: "Yes",
          role: "yes",
          handler: () => {
            this._store.dispatch(
              new RegisterActions.SignUp(this.registerForm.value)
            );
          }
        }
      ]
    };

    this._alert.create(options).present();
  }

  createForm() {
    this.registerForm = this._fb.group(
      {
        email: [null, Validators.required],
        password: [null, Validators.required],
        confirmPassword: [null, Validators.required],
        fullName: [null, Validators.required],
        contactNumber: [null, Validators.required]
      },
      {
        validator: PasswordMatchValidtor.MatchPassword
      }
    );
  }
}
