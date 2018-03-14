import { Component } from "@angular/core";

@Component({
  selector: "inquiry-sales-active",
  templateUrl: "inquiry-sales-active.html"
})
export class InquirySalesActiveComponent {
  text: string;

  constructor() {
    console.log("Hello InquirySalesActiveComponent Component");
    this.text = "Hello World";
  }
}
