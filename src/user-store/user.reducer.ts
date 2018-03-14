import * as UserActions from "./user.action";

export interface State {
  userId: number;
  email: string;
  fullName: string;
  token: string;
  contactNumber: string;
  profilePicture: string;
  role: number;
  refreshToken: string;
}

const initialState: State = {
  userId: null,
  email: null,
  fullName: null,
  token: null,
  contactNumber: null,
  profilePicture: null,
  role: null,
  refreshToken: null
};

export function reducer(
  state: State = initialState,
  action: UserActions.Actions
) {
  switch (action.type) {
    case UserActions.SETUSERCONFIG: {
      const {
        userId,
        email,
        fullName,
        token,
        contactNumber,
        profilePicture,
        role,
        refreshToken
      } = action.payload;
      return {
        ...state,
        userId,
        email,
        fullName,
        token,
        contactNumber,
        profilePicture,
        role,
        refreshToken
      };
    }

    case UserActions.CLEARUSERCONFIG: {
      return { ...state, initialState };
    }

    default:
      return state;
  }
}

export const getUserId = (state: State) => state.userId;
export const getUserEmail = (state: State) => state.email;
export const getUserFullName = (state: State) => state.fullName;
export const getUserToken = (state: State) => state.token;
export const getUserContactNumber = (state: State) => state.contactNumber;
export const getUserProfilePicture = (state: State) => state.profilePicture;
export const getUserRole = (state: State) => state.role;
export const getUserRefreshToken = (state: State) => state.refreshToken;
