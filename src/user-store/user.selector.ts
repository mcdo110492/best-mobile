import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromUserConfig from "./user.reducer";

export const getUserState = createFeatureSelector<fromUserConfig.State>(
  "userConfig"
);

export const getUserStateUserId = createSelector(
  getUserState,
  fromUserConfig.getUserId
);
export const getUserStateUserEmail = createSelector(
  getUserState,
  fromUserConfig.getUserEmail
);
export const getUserStateUserFullName = createSelector(
  getUserState,
  fromUserConfig.getUserFullName
);
export const getUserStateUserToken = createSelector(
  getUserState,
  fromUserConfig.getUserToken
);
export const getUserStateUserContactNumber = createSelector(
  getUserState,
  fromUserConfig.getUserContactNumber
);
export const getUserStateUserProfilePicture = createSelector(
  getUserState,
  fromUserConfig.getUserProfilePicture
);
export const getUserStateUserRole = createSelector(
  getUserState,
  fromUserConfig.getUserRole
);
export const getUserStateUserRefreshToken = createSelector(
  getUserState,
  fromUserConfig.getUserRefreshToken
);
