import { Action } from "@ngrx/store";
import {
  InquiryClientPending,
  InquiryClientOnProcess,
  InquiryPending,
  InquireResponse,
  InquiryOnProcess
} from "../models/inquiry-client.model";

export const INQUIRE_PENDING = "[INQUIRYCLIENT] INQUIREPENDING";

export class InquirePending implements Action {
  readonly type = INQUIRE_PENDING;
  constructor(public payload: boolean) {}
}

export const INQUIRE_PENDING_SUCCESS = "[INQUIRYCLIENT] INQUIREPENDINGSUCCESS";

export class InquirePendingSuccess implements Action {
  readonly type = INQUIRE_PENDING_SUCCESS;
  constructor(public payload: InquiryClientPending) {}
}

export const INQUIRE_PENDING_FAIL = "[INQUIRYCLIENT] INQUIREPENDINGFAIL";

export class InquirePendingFail implements Action {
  readonly type = INQUIRE_PENDING_FAIL;
  constructor(public payload: any) {}
}

export const INQUIRE_ONPROCESS = "[INQUIRYCLIENT] INQUIREONPROCESS";

export class InquireOnProcess implements Action {
  readonly type = INQUIRE_ONPROCESS;
  constructor(public payload: boolean) {}
}

export const INQUIRE_ONPROCESS_SUCCESS =
  "[INQUIRYCLIENT] INQUIREONPROCESSSUCCESS";

export class InquireOnProcessSuccess implements Action {
  readonly type = INQUIRE_ONPROCESS_SUCCESS;
  constructor(public payload: InquiryClientOnProcess) {}
}

export const INQUIRE_ONPROCESS_FAIL = "[INQUIRYCLIENT] INQUIREONPROCESSFAIL";

export class InquireOnProcessFail implements Action {
  readonly type = INQUIRE_ONPROCESS_FAIL;
  constructor(public payload: any) {}
}

export const INQUIRY = "[INQUIRY] INQUIRY";

export class Inquiry implements Action {
  readonly type = INQUIRY;
}

export const INQUIRY_SUCCESS = "[INQUIRY] INQUIRYSUCCESS";

export class InquirySucess implements Action {
  readonly type = INQUIRY_SUCCESS;
  constructor(public payload: InquireResponse) {}
}

export const INQUIRY_FAIL = "[INQUIRY] INQUIRYFAIL";

export class InquiryFail implements Action {
  readonly type = INQUIRY_FAIL;
  constructor(public payload: any) {}
}

export const INQUIRY_LISTEN_ECHO = "[INQUIRY] INQUIRYLISTENECHO";

export class InquiryListenEcho implements Action {
  readonly type = INQUIRY_LISTEN_ECHO;
  constructor(public payload: { status: number; data: InquiryOnProcess }) {}
}

export type InquiryActions =
  | InquirePending
  | InquirePendingSuccess
  | InquirePendingFail
  | InquireOnProcess
  | InquireOnProcessSuccess
  | InquireOnProcessFail
  | Inquiry
  | InquirySucess
  | InquiryFail
  | InquiryListenEcho;
