import { Component } from "@angular/core";
import { Events, AlertController, AlertOptions } from "ionic-angular";
import { Storage } from "@ionic/storage";
import {
  InquiryPending,
  InquiryOnProcess
} from "./models/inquiry-client.model";

import { LaravelEchoService } from "./../../config/laravel-echo.service";

import { Observable } from "rxjs/Observable";

import { Store } from "@ngrx/store";
import * as InquiryActions from "./store/inquiry-client.action";
import * as fromInquiry from "./store/inquiry-client.reducer";
import * as InquirySelectors from "./store/inquiry-client.selector";

@Component({
  selector: "page-inquiry-client",
  templateUrl: "inquiry-client.html"
})
export class InquiryClientPage {
  echo: any;
  inquries: string = "pending";

  pending$: Observable<InquiryPending[]>;
  pendingCount$: Observable<number>;
  onProcess$: Observable<InquiryOnProcess[]>;
  onProcessCount$: Observable<number>;

  constructor(
    private _events: Events,
    private _store: Store<fromInquiry.State>,
    private _alertCtrl: AlertController,
    private _echo: LaravelEchoService,
    private _storage: Storage
  ) {
    this.pending$ = this._store.select(
      InquirySelectors.getInquiryClientStatePending
    );
    this.pendingCount$ = this._store.select(
      InquirySelectors.getInquiryClientStatePendingCount
    );
    this.onProcess$ = this._store.select(
      InquirySelectors.getInquiryClientStateOnProcess
    );
    this.onProcessCount$ = this._store.select(
      InquirySelectors.getInquiryClientStateOnProcessCount
    );
  }

  ionViewDidLoad() {
    this._storage.ready().then(() => {
      this._storage.get("token").then(token => {
        //this.echo = this._echo.initConnection(token);
        //this.inquiryPusher();
        console.log("Storage Ready");
      });
    });
    this._store.dispatch(new InquiryActions.InquirePending(true));
    this._store.dispatch(new InquiryActions.InquireOnProcess(true));
  }

  ionViewDidLeave() {
    //this.leavePusher();
  }

  doRefresh(refresher) {
    if (this.inquries === "pending") {
      this._store.dispatch(new InquiryActions.InquirePending(false));
    } else {
      this._store.dispatch(new InquiryActions.InquireOnProcess(false));
    }

    this._events.subscribe("pending:arrive", () => {
      refresher.complete();
      this._events.unsubscribe("pending:arrive");
    });
  }

  inquiry() {
    const options: AlertOptions = {
      title: "Would you like to Inquire?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {}
        },
        {
          text: "Inquire",
          role: "inquire",
          handler: () => {
            this._store.dispatch(new InquiryActions.Inquiry());
          }
        }
      ]
    };
    this._alertCtrl.create(options).present();
  }

  inquiryPusher() {
    this._storage.get("userId").then(id => {
      this.echo.private(`inquiry-client.${id}`).listen("InquiryClient", res => {
        this._store.dispatch(
          new InquiryActions.InquiryListenEcho({
            status: res.status,
            data: res.inquiry
          })
        );
        console.log(res);
      });
    });
  }

  leavePusher() {
    this._storage.get("userId").then(id => {
      this.echo.leave(`inquiry-client.${id}`);
    });
  }
}
