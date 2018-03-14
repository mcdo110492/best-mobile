import { Action } from "@ngrx/store";
import { UserConfig } from "./models/user.model";

export const SETUSERCONFIG = "[USER] SETUSERCONFIG";

export class SetUserConfig implements Action {
  readonly type = SETUSERCONFIG;
  constructor(public payload: UserConfig) {}
}

export const CLEARUSERCONFIG = "[USER] CLEARUSERCONFIG";

export class ClearUserConfig implements Action {
  readonly type = CLEARUSERCONFIG;
}

export type Actions = SetUserConfig | ClearUserConfig;
