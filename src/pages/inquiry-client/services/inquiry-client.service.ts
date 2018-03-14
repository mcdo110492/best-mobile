import { Injectable } from "@angular/core";

import { Api } from "./../../../api";
import {
  InquiryClientPending,
  InquiryClientOnProcess,
  InquireResponse
} from "../models/inquiry-client.model";

@Injectable()
export class InquiryClientService {
  constructor(private _api: Api) {}

  getPending() {
    const url = "clients/inquiry/pending";
    return this._api.apiGet<InquiryClientPending>(url);
  }

  getOnProcess() {
    const url = "clients/inquiry/onProcess";
    return this._api.apiGet<InquiryClientOnProcess>(url);
  }

  inquiry() {
    const url = "clients/inquiry/inquire";
    return this._api.apiGet<InquireResponse>(url);
  }
}
