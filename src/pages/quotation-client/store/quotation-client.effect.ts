import { Injectable } from "@angular/core";
import { LoadingController, LoadingOptions } from "ionic-angular";
import { Effect, Actions } from "@ngrx/effects";

import { map, switchMap, catchError, tap } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as QuotationActions from "./quotation-client.action";

import { QuotationClientService } from "./../services";

@Injectable()
export class QuotationClientEffect {
  constructor(
    private _service: QuotationClientService,
    private _actions$: Actions,
    private _loader: LoadingController
  ) {}

  @Effect()
  getQuotations$ = this._actions$
    .ofType<QuotationActions.QuotationGet>(QuotationActions.QUOTATION_GET)
    .pipe(
      switchMap(() => {
        const options: LoadingOptions = {
          duration: 5000
        };
        let loading = this._loader.create(options);
        loading.present();

        return this._service
          .getQuoations()
          .pipe(
            map(resp => new QuotationActions.QuotationGetSuccess(resp)),
            tap(() => loading.dismiss()),
            catchError(err => of(new QuotationActions.QuotationGetFail(err)))
          );
      })
    );
}
