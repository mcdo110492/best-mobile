import { Component } from "@angular/core";

@Component({
  selector: "inquiry-sales-completed",
  templateUrl: "inquiry-sales-completed.html"
})
export class InquirySalesCompletedComponent {
  text: string;

  constructor() {
    console.log("Hello InquirySalesCompletedComponent Component");
    this.text = "Hello World";
  }
}
