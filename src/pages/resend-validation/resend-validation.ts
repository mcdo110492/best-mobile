import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  NavController,
  Events,
  AlertController,
  AlertOptions
} from "ionic-angular";

import { Store } from "@ngrx/store";

import * as ResendActions from "./store/resend-validation.action";

@Component({
  selector: "page-resend-validation",
  templateUrl: "resend-validation.html"
})
export class ResendValidationPage {
  resendForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _navCtrl: NavController,
    private _event: Events,
    private _store: Store<any>,
    private _alert: AlertController
  ) {
    this.createForm();
  }

  ionViewDidLoad() {
    this._event.subscribe("resend:success", () => {
      this._navCtrl.pop();
    });
  }

  ionViewDidLeave() {
    this._event.unsubscribe("resend:success");
  }

  resend() {
    const options: AlertOptions = {
      title: "Are you sure?",
      message: "It will invalidate the previous activation code.",
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
              new ResendActions.Resend(this.resendForm.value)
            );
          }
        }
      ]
    };

    this._alert.create(options).present();
  }

  createForm() {
    this.resendForm = this._fb.group({
      email: [null, Validators.required]
    });
  }
}
