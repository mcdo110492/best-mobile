import { Component } from "@angular/core";

import { SettingsPage } from "./../settings";
import { HistorySalesPage } from "./../history-sales";

import { InquiryClientPage } from "./../inquiry-client";
import { QuotationClientPage } from "./../quotation-client";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  settingsPage = SettingsPage;
  historySalesPage = HistorySalesPage;

  inquiryClientPage = InquiryClientPage;
  quotationClientPage = QuotationClientPage;

  constructor() {}
}
