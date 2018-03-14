import { ActionReducerMap } from "@ngrx/store";

import * as fromUserConfig from "./../user-store/user.reducer";
import * as fromInquiryClient from "./../pages/inquiry-client/store/inquiry-client.reducer";
import * as fromQuotationClient from "./../pages/quotation-client/store/quotation-client.reducer";

export interface State {
  userConfig: fromUserConfig.State;
  inquiryClient: fromInquiryClient.State;
  quotationClient: fromQuotationClient.State;
}

export const reducers: ActionReducerMap<State> = {
  userConfig: fromUserConfig.reducer,
  inquiryClient: fromInquiryClient.reducer,
  quotationClient: fromQuotationClient.reducer
};
