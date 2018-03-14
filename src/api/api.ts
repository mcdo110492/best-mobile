import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Observable } from "rxjs/Observable";

import { environment } from "./../environments/environment";

@Injectable()
export class Api {
  private _api: string = environment.api;
  constructor(private _http: HttpClient) {}

  apiGet<T>(url: string, params?: HttpParams): Observable<T> {
    return this._http.get<T>(`${this._api}/${url}`, { params });
  }

  apiPost<T>(url: string, body: any): Observable<T> {
    return this._http.post<T>(`${this._api}/${url}`, body);
  }

  apiPut<T>(url: string, body: any): Observable<T> {
    return this._http.put<T>(`${this._api}/${url}`, body);
  }
}
