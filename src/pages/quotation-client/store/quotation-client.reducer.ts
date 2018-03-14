import * as Actions from "./quotation-client.action";
import { QuotationClientModel } from "../models/quotation-client.model";

export interface State {
  count: number;
  quotations: { [id: number]: QuotationClientModel };
  selectedQuotationId: number;
}

const initialState: State = {
  count: 0,
  quotations: {},
  selectedQuotationId: null
};

export function reducer(
  state: State = initialState,
  action: Actions.QuotationActions
) {
  switch (action.type) {
    case Actions.QUOTATION_GET_SUCCESS: {
      const { count, data } = action.payload;
      let quotations = data.reduce(
        (
          quotations: { [id: number]: QuotationClientModel },
          data: QuotationClientModel
        ) => {
          return { ...quotations, [data.inquiryId]: data };
        },
        { ...state.quotations }
      );
      return { ...state, quotations, count };
    }
    case Actions.QUOTATION_SELECT: {
      const selectedQuotationId = action.payload;
      return { ...state, selectedQuotationId };
    }
    default: {
      return state;
    }
  }
}

export const getQuotationCount = (state: State) => state.count;
export const getQuotationEntities = (state: State) => state.quotations;
export const getSelectedQuotationId = (state: State) =>
  state.selectedQuotationId;
