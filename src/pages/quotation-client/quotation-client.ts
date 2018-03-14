import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as fromQuotation from "./store/quotation-client.reducer";
import * as QuotationActions from "./store/quotation-client.action";
import * as QuotationSelectors from "./store/quotation-client.selector";
import { QuotationClientModel } from "./models/quotation-client.model";

import { QuotationClientViewPage } from "./../quotation-client-view/quotation-client-view";

@Component({
  selector: "page-quotation-client",
  templateUrl: "quotation-client.html"
})
export class QuotationClientPage {
  quotationCount$: Observable<number>;
  quotations$: Observable<QuotationClientModel[]>;

  constructor(
    private _store: Store<fromQuotation.State>,
    private _nav: NavController
  ) {
    this.quotationCount$ = this._store.select(
      QuotationSelectors.getQuotationStateCount
    );
    this.quotations$ = this._store.select(
      QuotationSelectors.getQuotationsStateData
    );
  }

  ionViewDidLoad() {
    this._store.dispatch(new QuotationActions.QuotationGet());
  }

  goToView(id: number) {
    this._store.dispatch(new QuotationActions.QuotationSelect(id));
    this._nav.push(QuotationClientViewPage);
  }
}
