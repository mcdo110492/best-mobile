import { Injectable } from "@angular/core";

import { Api } from "./../../../api";
import { LoginModel } from "../models/login.model";
import { LoginResponseModel } from "../models/login.response.model";
import { ValidateTokenResponse } from "../models/validate-token.response.model";

@Injectable()
export class LoginService {
  constructor(private _api: Api) {}

  authenticate(data: LoginModel) {
    const url = "authenticate/client";
    return this._api.apiPost<LoginResponseModel>(url, data);
  }

  validateToken() {
    const url = "token/verify";
    return this._api.apiGet<ValidateTokenResponse>(url);
  }
}
