import { Action } from "@ngrx/store";

export const RESEND = "[RESEND] RESEND";

export class Resend implements Action {
  readonly type = RESEND;
  constructor(public payload: { email: string }) {}
}

export const RESEND_SUCCESS = "[RESEND] RESENDSUCCESS";

export class ResendSuccess implements Action {
  readonly type = RESEND_SUCCESS;
  constructor(public payload: { status: number; message: string }) {}
}

export const RESEND_FAIL = "[RESEND] RESENDFAIL";

export class ResendFail implements Action {
  readonly type = RESEND_FAIL;
  constructor(public payload: any) {}
}

export type ResendActions = Resend | ResendSuccess | ResendFail;
