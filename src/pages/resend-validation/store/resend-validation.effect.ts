import { Injectable } from "@angular/core";
import {
  LoadingController,
  LoadingOptions,
  AlertController,
  AlertOptions,
  Events
} from "ionic-angular";
import { Effect, Actions } from "@ngrx/effects";

import { map, concatMap, catchError, tap, filter } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as ResendActions from "./resend-validation.action";

import { ResendValidationService } from "./../services/resend-validation.service";

@Injectable()
export class ResendValidationEffect {
  constructor(
    private _service: ResendValidationService,
    private _actions: Actions,
    private _loading: LoadingController,
    private _alert: AlertController,
    private _events: Events
  ) {}

  @Effect()
  resend$ = this._actions
    .ofType<ResendActions.Resend>(ResendActions.RESEND)
    .pipe(
      concatMap(action => {
        const options: LoadingOptions = {
          content: "Please Wait...",
          duration: 3000
        };
        let loading = this._loading.create(options);
        loading.present();
        return this._service.resendCode(action.payload).pipe(
          map(resp => new ResendActions.ResendSuccess(resp)),
          tap(() => {
            this._events.publish("resend:success");
            loading.dismiss();
          }),
          catchError(err => of(new ResendActions.ResendFail(err)))
        );
      })
    );

  @Effect({ dispatch: false })
  resendSuccess$ = this._actions
    .ofType<ResendActions.ResendSuccess>(ResendActions.RESEND_SUCCESS)
    .pipe(
      map(action => action.payload),
      map(payload => {
        const { status, message } = payload;
        if (status == 200) {
          const options: AlertOptions = {
            title: "Success",
            message: `${message}`,
            buttons: ["Ok"]
          };
          this._alert.create(options).present();
        } else if (status == 403 || status == 404) {
          const options: AlertOptions = {
            title: "Failed",
            message: `${message}`,
            buttons: ["Ok"]
          };
          this._alert.create(options).present();
        }
      })
    );
}
