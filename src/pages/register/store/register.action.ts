import { Action } from "@ngrx/store";
import { Register, RegisterResponse } from "../models/register.model";

export const SIGNUP = "[REGISTER] SIGNUP";

export class SignUp implements Action {
  readonly type = SIGNUP;
  constructor(public payload: Register) {}
}

export const SIGNUP_SUCCESS = "[REGISTER] SUGNUPSUCCESS";

export class SignUpSuccess implements Action {
  readonly type = SIGNUP_SUCCESS;
  constructor(public paylaod: RegisterResponse) {}
}

export const SIGNUP_FAIL = "[REGISTER] SIGNUPFAIL";

export class SignUpFail implements Action {
  readonly type = SIGNUP_FAIL;
  constructor(public payload: any) {}
}

export type RegisterActions = SignUp | SignUpSuccess | SignUpFail;
