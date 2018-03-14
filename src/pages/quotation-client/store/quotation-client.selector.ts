import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromQuotation from "./quotation-client.reducer";
import { QuotationClientModel } from "../models/quotation-client.model";

export const getQuotationState = createFeatureSelector<fromQuotation.State>(
  "quotationClient"
);

export const getQuotationStateCount = createSelector(
  getQuotationState,
  fromQuotation.getQuotationCount
);

export const getQuotationStateEntities = createSelector(
  getQuotationState,
  fromQuotation.getQuotationEntities
);

export const getQuotationsStateData = createSelector(
  getQuotationStateEntities,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);

export const getQuotationSelectedId = createSelector(
  getQuotationState,
  fromQuotation.getSelectedQuotationId
);

export const getQuotationSelectedData = createSelector(
  getQuotationStateEntities,
  getQuotationSelectedId,
  (entities, selectedId): QuotationClientModel => {
    return selectedId && entities[selectedId];
  }
);
