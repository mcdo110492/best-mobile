import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

@Component({
  selector: "page-create-quotation-sales",
  templateUrl: "create-quotation-sales.html"
})
export class CreateQuotationSalesPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad CreateQuotationSalesPage");
  }

  viewPdf() {}

  upload() {}
}
