import { Inject, Injectable } from "@angular/core";

import { Api } from "./../../../api";
import {
  QuotationClientResponseModel,
  QuotationResponse
} from "../models/quotation-client.model";

@Injectable()
export class QuotationClientService {
  constructor(private _api: Api) {}

  getQuoations() {
    const url = "clients/quotations/pending";
    return this._api.apiGet<QuotationClientResponseModel>(url);
  }

  acceptQuotation(quotationId: number) {
    const url = "clients/quotations/accepting";
    return this._api.apiPost<QuotationResponse>(url, { quotationId });
  }

  rejectQuotation(quotationId: number) {
    const url = "clients/quotations/rejecting";
    return this._api.apiPost<QuotationResponse>(url, { quotationId });
  }
}
