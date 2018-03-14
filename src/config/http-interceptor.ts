import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import { mergeMap } from "rxjs/operators";
import { Storage } from "@ionic/storage";

@Injectable()
export class HttpConfigInterceptorService implements HttpInterceptor {
  constructor(private _storage: Storage) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return fromPromise(this._storage.get("token")).pipe(
      mergeMap(token => {
        const authRequest = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(authRequest);
      })
    );
  }
}
