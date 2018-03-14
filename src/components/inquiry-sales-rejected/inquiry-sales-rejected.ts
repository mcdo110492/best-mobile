import { Component } from "@angular/core";

@Component({
  selector: "inquiry-sales-rejected",
  templateUrl: "inquiry-sales-rejected.html"
})
export class InquirySalesRejectedComponent {
  text: string;

  constructor() {
    console.log("Hello InquirySalesRejectedComponent Component");
    this.text = "Hello World";
  }
}
