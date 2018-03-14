import { Component } from "@angular/core";

import { NavController } from "ionic-angular";

import { CreateQuotationSalesPage } from "./../create-quotation-sales";

@Component({
  selector: "page-quotation-sales",
  templateUrl: "quotation-sales.html"
})
export class QuotationSalesPage {
  quotation: string = "pending";
  constructor(private _navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad QuotationSalesPage");
  }

  quote() {
    this._navCtrl.push(CreateQuotationSalesPage);
  }
}
