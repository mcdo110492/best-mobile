import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";

@Component({
  selector: "page-inquiry-sales",
  templateUrl: "inquiry-sales.html"
})
export class InquirySalesPage {
  inquries: string = "pending";
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad InquirySalesPage");
  }

  getPending(ev) {}
}
