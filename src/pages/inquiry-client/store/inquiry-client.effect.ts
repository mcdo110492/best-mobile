import { Injectable } from "@angular/core";
import {
  LoadingController,
  LoadingOptions,
  Events,
  AlertController,
  AlertOptions,
  ToastController,
  ToastOptions
} from "ionic-angular";
import { Effect, Actions } from "@ngrx/effects";

import { map, catchError, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { InquiryClientService } from "./../services";

import * as InquiryActions from "./inquiry-client.action";

@Injectable()
export class InquiryClientEffect {
  constructor(
    private _actions$: Actions,
    private _service: InquiryClientService,
    private _events: Events,
    private _loaderCtrl: LoadingController,
    private _alert: AlertController,
    private _toast: ToastController
  ) {}

  @Effect()
  pending$ = this._actions$
    .ofType<InquiryActions.InquirePending>(InquiryActions.INQUIRE_PENDING)
    .pipe(
      map(action => action.payload),
      switchMap(isInit => {
        const options: LoadingOptions = {
          duration: 5000
        };
        let loading = this._loaderCtrl.create(options);
        if (isInit) {
          loading.present();
        }

        return this._service.getPending().pipe(
          map(resp => new InquiryActions.InquirePendingSuccess(resp)),
          tap(() => {
            if (isInit) {
              loading.dismiss();
            } else {
              this._events.publish("pending:arrive");
            }
          }),
          catchError(err => of(new InquiryActions.InquirePendingFail(err)))
        );
      })
    );

  @Effect()
  onProcess$ = this._actions$
    .ofType<InquiryActions.InquireOnProcess>(InquiryActions.INQUIRE_ONPROCESS)
    .pipe(
      switchMap(() => {
        return this._service.getOnProcess().pipe(
          map(resp => new InquiryActions.InquireOnProcessSuccess(resp)),
          tap(() => {
            this._events.publish("pending:arrive");
          }),
          catchError(err => of(new InquiryActions.InquireOnProcessFail(err)))
        );
      })
    );

  @Effect()
  inquiry$ = this._actions$
    .ofType<InquiryActions.Inquiry>(InquiryActions.INQUIRY)
    .pipe(
      switchMap(response => {
        const options: LoadingOptions = {
          content: "Processing...",
          duration: 5000,
          showBackdrop: true,
          enableBackdropDismiss: false
        };
        let loader = this._loaderCtrl.create(options);
        loader.present();
        return this._service.inquiry().pipe(
          map(resp => {
            loader.dismiss();
            return new InquiryActions.InquirySucess(resp);
          }),
          catchError(err => of(new InquiryActions.InquiryFail(err)))
        );
      })
    );
  @Effect()
  inquirySuccess$ = this._actions$
    .ofType<InquiryActions.InquirySucess>(InquiryActions.INQUIRY_SUCCESS)
    .pipe(
      map(action => action.payload),
      switchMap(resp => {
        if (resp.status == 200) {
          const options: ToastOptions = {
            message: "Inquiry Success",
            position: "top",
            duration: 1000
          };
          this._toast.create(options).present();
          return of(new InquiryActions.InquirePending(false));
        } else if (resp.status == 404) {
          const options: AlertOptions = {
            title: "Inquiry Failed",
            subTitle: "You must meet the neccessary requirements.",
            message: "Address and Valid ID is required. Goto -> Settings Tab",
            buttons: ["Ok"]
          };
          this._alert.create(options).present();
        }
        return of();
      })
    );
}
