import { Injectable } from "@angular/core";

import { Api } from "./../../../api";
import { Register, RegisterResponse } from "../models/register.model";

@Injectable()
export class RegisterService {
  constructor(private _api: Api) {}

  signUp(data: Register) {
    const url = "register";
    return this._api.apiPost<RegisterResponse>(url, data);
  }
}
