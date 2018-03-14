import { Component } from "@angular/core";
import {
  ToastController,
  NavController,
  AlertController,
  AlertOptions
} from "ionic-angular";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import * as fromQuotation from "./../quotation-client/store/quotation-client.reducer";
import * as QuotationSelectors from "./../quotation-client/store/quotation-client.selector";
import { QuotationClientModel } from "../quotation-client/models/quotation-client.model";

import { FileChooser } from "@ionic-native/file-chooser";
import { File, FileEntry, IFile } from "@ionic-native/file";

import { QuotationClientUploadPage } from "./../quotation-client-upload/quotation-client-upload";

@Component({
  selector: "page-quotation-client-view",
  templateUrl: "quotation-client-view.html"
})
export class QuotationClientViewPage {
  selectedQuotation$: Observable<QuotationClientModel>;

  constructor(
    private _store: Store<fromQuotation.State>,
    private _fileChooser: FileChooser,
    private _file: File,
    private _toast: ToastController,
    private _navCtrl: NavController,
    private _alertCtrl: AlertController
  ) {
    this.selectedQuotation$ = this._store.select(
      QuotationSelectors.getQuotationSelectedData
    );
  }

  ionViewDidLoad() {}

  uploadQuotation(inquiryId: number) {
    const options: AlertOptions = {
      title: "File Upload",
      message:
        "WARNING!! Please make sure you uploaded a correct file. Once you uploaded a file you can't change it. PDF files only.",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {}
        },
        {
          text: "Proceed",
          role: "proceed",
          handler: () => {
            this.openChooser(inquiryId);
          }
        }
      ]
    };

    this._alertCtrl.create(options).present();
  }

  openChooser(inquiryId: number) {
    this._fileChooser
      .open()
      .then(uri => {
        this._file.resolveLocalFilesystemUrl(uri).then((entry: FileEntry) => {
          entry.file((meta: IFile) => {
            if (meta.type === "application/pdf") {
              this._navCtrl.push(QuotationClientUploadPage, { inquiryId, uri });
            } else {
              this._toast
                .create({
                  message: "PDF Files only.",
                  position: "bottom",
                  duration: 2000
                })
                .present();
            }
          });
        });
      })
      .catch(err => console.log(err));
  }
}
