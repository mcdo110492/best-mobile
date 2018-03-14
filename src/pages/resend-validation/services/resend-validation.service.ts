import { Injectable } from "@angular/core";

import { Api } from "./../../../api";

@Injectable()
export class ResendValidationService {
  constructor(private _api: Api) {}

  resendCode(data: { email: string }) {
    const url = "activation/resend";
    return this._api.apiPost<{ status: number; message: string }>(url, data);
  }
}
