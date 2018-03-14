import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromInquiryClient from "./inquiry-client.reducer";

export const getInquiryClientState = createFeatureSelector<
  fromInquiryClient.State
>("inquiryClient");

export const getInquiryClientPendingEntities = createSelector(
  getInquiryClientState,
  fromInquiryClient.getInquiryPending
);

export const getInquiryClientStatePending = createSelector(
  getInquiryClientPendingEntities,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);

export const getInquiryClientStatePendingCount = createSelector(
  getInquiryClientState,
  fromInquiryClient.getInquiryPendingCount
);

export const getInquiryClientOnProcessEntities = createSelector(
  getInquiryClientState,
  fromInquiryClient.getInquiryOnProcess
);

export const getInquiryClientStateOnProcess = createSelector(
  getInquiryClientOnProcessEntities,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);

export const getInquiryClientStateOnProcessCount = createSelector(
  getInquiryClientState,
  fromInquiryClient.getInquiryOnProcessCount
);
