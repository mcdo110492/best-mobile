import { Injectable } from "@angular/core";

import {
  LoadingController,
  LoadingOptions,
  AlertController,
  AlertOptions,
  Events
} from "ionic-angular";
import { Effect, Actions } from "@ngrx/effects";
import { map, catchError, tap, concatMap, filter } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as RegisterActions from "./register.action";

import { RegisterService } from "./../services/register.service";

@Injectable()
export class RegisterEffect {
  constructor(
    private _actions$: Actions,
    private _service: RegisterService,
    private _loading: LoadingController,
    private _alert: AlertController,
    private _events: Events
  ) {}

  @Effect()
  signUp$ = this._actions$
    .ofType<RegisterActions.SignUp>(RegisterActions.SIGNUP)
    .pipe(
      concatMap(action => {
        const options: LoadingOptions = {
          content: "Please Wait...",
          duration: 3000
        };
        let loading = this._loading.create(options);

        loading.present();
        return this._service.signUp(action.payload).pipe(
          map(resp => new RegisterActions.SignUpSuccess(resp)),
          tap(() => {
            this._events.publish("register:success");
            loading.dismiss();
          }),
          catchError(err => of(new RegisterActions.SignUpFail(err)))
        );
      })
    );

  @Effect({ dispatch: false })
  signUpSuccess$ = this._actions$
    .ofType<RegisterActions.SignUpSuccess>(RegisterActions.SIGNUP_SUCCESS)
    .pipe(
      map(resp => {
        const options: AlertOptions = {
          title: "Success",
          message:
            "An email has been sent to activate your account. Thank You!",
          buttons: ["Ok"]
        };
        this._alert.create(options).present();
      })
    );

  @Effect({ dispatch: false })
  signUpFail$ = this._actions$
    .ofType<RegisterActions.SignUpFail>(RegisterActions.SIGNUP_FAIL)
    .pipe(
      map(action => action.payload),
      filter(response => response.status == 200),
      map(() => {
        const options: AlertOptions = {
          title: "Failed",
          message:
            "There's an error while processing your form. Please check again",
          buttons: ["Ok"]
        };
        this._alert.create(options).present();
      })
    );
}
