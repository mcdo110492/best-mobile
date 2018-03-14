import { Injectable } from "@angular/core";

import {
  LoadingController,
  LoadingOptions,
  Events,
  AlertController,
  AlertOptions
} from "ionic-angular";

import { Effect, Actions } from "@ngrx/effects";
import { map, switchMap, catchError, tap } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import { LoginService } from "./../services";

import * as LoginActions from "./login.action";
import * as UserConfigActions from "./../../../user-store/user.action";
import { UserConfigService } from "./../../../user-store/services";

@Injectable()
export class LoginEffect {
  constructor(
    private _actions$: Actions,
    private _loadingCtrl: LoadingController,
    private _service: LoginService,
    private _events: Events,
    private _alertCtrl: AlertController,
    private _userService: UserConfigService
  ) {}

  /**
   * An effect that will listen to the dispatch action LOGIN
   * @return Dispatch Action
   * @response LoginResponseModel
   */
  @Effect()
  authenticate$ = this._actions$
    .ofType<LoginActions.Login>(LoginActions.LOGIN)
    .pipe(
      switchMap(action => {
        const options: LoadingOptions = {
          content: "Authenticating...",
          duration: 2000,
          showBackdrop: true,
          enableBackdropDismiss: false
        };
        let loader = this._loadingCtrl.create(options);
        loader.present();
        return this._service
          .authenticate(action.payload)
          .pipe(
            map(response => new LoginActions.LoginSuccess(response)),
            tap(() => loader.dismiss()),
            catchError(err => of(new LoginActions.LoginFailed(err)))
          );
      })
    );

  /**
   * An effect that will listen to the action dispatch LOGIN_SUCCESS
   * And will publish an events depending of the status of response
   */
  @Effect()
  authenticateSuccess$ = this._actions$
    .ofType<LoginActions.LoginSuccess>(LoginActions.LOGIN_SUCESS)
    .pipe(
      map(action => action.payload),
      switchMap(payload => {
        const status = payload.status;
        if (status == 200) {
          const { token, user } = payload;
          const data = {
            token,
            userId: user.userId,
            email: user.email,
            role: user.role,
            fullName: user.fullName,
            contactNumber: user.contactNumber,
            profilePicture: user.profilePicture,
            refreshToken: user.refreshToken
          };
          this._userService.setUserCredentials(data);
          this._events.publish("login:success", true);

          return of(new UserConfigActions.SetUserConfig(data));
        } else if (status == 404) {
          const options: AlertOptions = {
            title: "Login Failed",
            message: "Incorrect email or password",
            buttons: ["ok"]
          };

          this._alertCtrl.create(options).present();
        } else if (status == 403) {
          const options: AlertOptions = {
            title: "Account not Activated",
            message:
              "Check your email to activate your account. Or click Resend Activatin Code.",
            buttons: [
              {
                text: "Cancel",
                role: "cancel",
                handler: () => {}
              },
              {
                text: "Resend",
                role: "resend",
                handler: () => {
                  this._events.publish("login:success", false);
                }
              }
            ]
          };

          this._alertCtrl.create(options).present();
        }
        this._userService.clearUserConfig();
        return of(new UserConfigActions.ClearUserConfig());
      })
    );

  @Effect()
  verifyToken$ = this._actions$
    .ofType<LoginActions.ValidateToken>(LoginActions.VALIDATE_TOKEN)
    .pipe(
      switchMap(action => {
        return this._service
          .validateToken()
          .pipe(
            map(resp => new LoginActions.ValidateTokenSuccess(resp)),
            catchError(err => of(new LoginActions.ValidateTokenFailed(err)))
          );
      })
    );

  @Effect({ dispatch: false })
  verifyTokenSuccess$ = this._actions$
    .ofType<LoginActions.ValidateTokenSuccess>(
      LoginActions.VALIDATE_TOKEN_SUCCESS
    )
    .pipe(
      tap(() => {
        this._events.publish("token:valid", true);
      })
    );

  @Effect()
  verifyTokenFailed$ = this._actions$
    .ofType<LoginActions.ValidateTokenFailed>(
      LoginActions.VALIDATE_TOKEN_FAILED
    )
    .pipe(
      map(() => {
        this._userService.clearUserConfig();
        this._events.publish("token:valid", false);
        return new UserConfigActions.ClearUserConfig();
      })
    );
}
