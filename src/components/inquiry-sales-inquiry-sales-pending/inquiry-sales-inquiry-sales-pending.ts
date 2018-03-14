import { Component } from "@angular/core";

import { ModalController } from "ionic-angular";

import { ProcessInquirySalesPage } from "./../../pages/process-inquiry-sales";

@Component({
  selector: "inquiry-sales-inquiry-sales-pending",
  templateUrl: "inquiry-sales-inquiry-sales-pending.html"
})
export class InquirySalesInquirySalesPendingComponent {
  text: string;

  constructor(private _modalCtrl: ModalController) {}

  process() {
    this._modalCtrl.create(ProcessInquirySalesPage).present();
  }
}
