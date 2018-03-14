import * as InquiryActions from "./inquiry-client.action";
import {
  InquiryPending,
  InquiryOnProcess
} from "../models/inquiry-client.model";

export interface State {
  inquiryPending: { [id: number]: InquiryPending };
  inquiryPendingCount: number;
  inquiryOnProcess: { [id: number]: InquiryOnProcess };
  inquiryOnProcessCount: number;
}

const initialState: State = {
  inquiryPending: {},
  inquiryPendingCount: 0,
  inquiryOnProcess: {},
  inquiryOnProcessCount: 0
};

export function reducer(
  state: State = initialState,
  action: InquiryActions.InquiryActions
) {
  switch (action.type) {
    case InquiryActions.INQUIRE_PENDING_SUCCESS: {
      const { count, data } = action.payload;
      let inquiryPending = data.reduce(
        (pending: { [id: number]: InquiryPending }, data: InquiryPending) => {
          return { ...pending, [data.inquiryId]: data };
        },
        { ...state.inquiryPending }
      );
      return { ...state, inquiryPending, inquiryPendingCount: count };
    }
    case InquiryActions.INQUIRE_ONPROCESS_SUCCESS: {
      const { count, data } = action.payload;
      let inquiryOnProcess = data.reduce(
        (
          onProcess: { [id: number]: InquiryOnProcess },
          data: InquiryOnProcess
        ) => {
          return { ...onProcess, [data.inquiryId]: data };
        },
        { ...state.inquiryOnProcess }
      );
      return { ...state, inquiryOnProcess, inquiryOnProcessCount: count };
    }
    case InquiryActions.INQUIRY_LISTEN_ECHO: {
      const { status, data } = action.payload;
      if (status == 1) {
        //Remove the data in pending
        const {
          [data.inquiryId]: removed,
          ...inquiryPending
        } = state.inquiryPending;
        const inquiryPendingCount = state.inquiryPendingCount - 1;
        //Add the data in onProcess
        const inquiryOnProcess = {
          ...state.inquiryOnProcess,
          [data.inquiryId]: data
        };
        const inquiryOnProcessCount = state.inquiryOnProcessCount + 1;

        return {
          ...state,
          inquiryPending,
          inquiryOnProcess,
          inquiryPendingCount,
          inquiryOnProcessCount
        };
      } else {
        //Remove the data in pending
        const {
          [data.inquiryId]: removed,
          ...inquiryPending
        } = state.inquiryPending;
        const inquiryPendingCount = state.inquiryPendingCount - 1;

        return { ...state, inquiryPending, inquiryPendingCount };
      }
    }
    default: {
      return state;
    }
  }
}

export const getInquiryPending = (state: State) => state.inquiryPending;
export const getInquiryPendingCount = (state: State) =>
  state.inquiryPendingCount;
export const getInquiryOnProcess = (state: State) => state.inquiryOnProcess;
export const getInquiryOnProcessCount = (state: State) =>
  state.inquiryOnProcessCount;
