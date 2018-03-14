import { Action } from "@ngrx/store";
import { LoginModel } from "./../models/login.model";
import { LoginResponseModel } from "./../models/login.response.model";
import { ValidateTokenResponse } from "../models/validate-token.response.model";

export const LOGIN = "[LOGIN] LOGIN";

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: LoginModel) {}
}

export const LOGIN_SUCESS = "[LOGIN] LOGINSUCCESS";

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCESS;
  constructor(public payload: LoginResponseModel) {}
}

export const LOGIN_FAILED = "[LOGIN] LOGINFAILED";

export class LoginFailed implements Action {
  readonly type = LOGIN_FAILED;
  constructor(public payload: any) {}
}

export const VALIDATE_TOKEN = "[LOGIN] VALIDATETOKEN";

export class ValidateToken implements Action {
  readonly type = VALIDATE_TOKEN;
}

export const VALIDATE_TOKEN_SUCCESS = "[LOGIN] VALIDATETOKENSUCCESS";

export class ValidateTokenSuccess implements Action {
  readonly type = VALIDATE_TOKEN_SUCCESS;
  constructor(public payload: ValidateTokenResponse) {}
}

export const VALIDATE_TOKEN_FAILED = "[LOGIN] VALIDATETOKENFAILED";

export class ValidateTokenFailed implements Action {
  readonly type = VALIDATE_TOKEN_FAILED;
  constructor(public payload: any) {}
}

export type Actions =
  | Login
  | LoginSuccess
  | LoginFailed
  | ValidateToken
  | ValidateTokenSuccess
  | ValidateTokenFailed;
