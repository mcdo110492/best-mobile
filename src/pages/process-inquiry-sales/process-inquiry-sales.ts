import { Component } from "@angular/core";

import {
  ViewController,
  LoadingController,
  LoadingOptions,
  Loading,
  AlertController,
  AlertOptions
} from "ionic-angular";

@Component({
  selector: "page-process-inquiry-sales",
  templateUrl: "process-inquiry-sales.html"
})
export class ProcessInquirySalesPage {
  constructor(
    private _viewCtrl: ViewController,
    private _loadingCtrl: LoadingController,
    private _alerCtrl: AlertController
  ) {}
  loading: Loading;
  ionViewDidLoad() {
    const options: LoadingOptions = {
      content: "Processing...",
      duration: 2000,
      enableBackdropDismiss: false
    };
    this.loading = this._loadingCtrl.create(options);
  }

  accept() {
    let confirm = this._alerCtrl.create({
      title: "Would you like to accept this inquiry?",
      message:
        "After you accept this inquiry you can view and create quotation in the quotation tab",
      buttons: [
        {
          text: "No",
          handler: () => {
            console.log("Cancel");
          }
        },
        {
          text: "Yes",
          handler: () => {
            this.loading.present();
          }
        }
      ]
    });

    confirm.present();

    this.loading.onDidDismiss(() => {
      const options: AlertOptions = {
        title: "Success",
        subTitle: "Inquiry Number: 12312313 has been accepted",
        message:
          "This inquiry has been moved to the Quotation Tab for further processing.",
        buttons: ["Ok"]
      };
      this._alerCtrl.create(options).present();
      this._viewCtrl.dismiss();
    });
  }

  reject() {
    let confirm = this._alerCtrl.create({
      title: "Would you like to reject this inquiry?",
      message: "You can't undo this transaction once rejected.",
      inputs: [
        {
          name: "reason",
          placeholder: "Enter your reason here..."
        }
      ],
      buttons: [
        {
          text: "No",
          handler: () => {
            console.log("Cancel");
          }
        },
        {
          text: "Yes",
          handler: data => {
            this.loading.present();
          }
        }
      ]
    });

    confirm.present();

    this.loading.onDidDismiss(() => {
      const options: AlertOptions = {
        title: "Success",
        subTitle: "Inquiry Number: 12312313 has been rejected",
        message: "You can view this inquiry in the History tab.",
        buttons: ["Ok"]
      };
      this._alerCtrl.create(options).present();
      this._viewCtrl.dismiss();
    });
  }

  dismiss() {
    this._viewCtrl.dismiss();
  }
}
