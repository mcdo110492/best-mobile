import { Component } from "@angular/core";
import {
  LoadingController,
  LoadingOptions,
  AlertController,
  AlertOptions
} from "ionic-angular";

@Component({
  selector: "page-forgot-password",
  templateUrl: "forgot-password.html"
})
export class ForgotPasswordPage {
  constructor(
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ForgotPasswordPage");
  }

  resetPassword() {
    const options: LoadingOptions = {
      content: "Processing your request. Please Wait...",
      duration: 3000
    };
    let loading = this._loadingCtrl.create(options);

    loading.present();

    loading.onDidDismiss(() => {
      const options: AlertOptions = {
        title: "Success",
        message:
          "An email has been sent to complete your password reset. Thank You!",
        buttons: ["Ok"]
      };

      this._alertCtrl.create(options).present();
    });
  }
}
