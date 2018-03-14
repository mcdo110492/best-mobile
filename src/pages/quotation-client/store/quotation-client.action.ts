import { Action } from "@ngrx/store";
import { QuotationClientResponseModel } from "../models/quotation-client.model";

export const QUOTATION_GET = "[QUOTATION] QUOTATIONGET";

export class QuotationGet implements Action {
  readonly type = QUOTATION_GET;
}

export const QUOTATION_GET_SUCCESS = "[QUOTATION] QUOTATIONGETSUCCESS";

export class QuotationGetSuccess implements Action {
  readonly type = QUOTATION_GET_SUCCESS;
  constructor(public payload: QuotationClientResponseModel) {}
}

export const QUOTATION_GET_FAIL = "[QUOTATION] QUOTATIONGETFAIL";

export class QuotationGetFail implements Action {
  readonly type = QUOTATION_GET_FAIL;
  constructor(public payload: any) {}
}

export const QUOTATION_SELECT = "[QUOTATION] QUOTATIONSELECT";

export class QuotationSelect implements Action {
  readonly type = QUOTATION_SELECT;
  constructor(public payload: number) {}
}

export type QuotationActions =
  | QuotationGet
  | QuotationGetSuccess
  | QuotationGetFail
  | QuotationSelect;
