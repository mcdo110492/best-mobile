import { Component } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";

import {
  FileTransfer,
  FileTransferObject,
  FileUploadOptions
} from "@ionic-native/file-transfer";
import { Storage } from "@ionic/storage";
import { environment } from "./../../environments/environment";

@Component({
  selector: "page-quotation-client-upload",
  templateUrl: "quotation-client-upload.html"
})
export class QuotationClientUploadPage {
  percent: number = 0;
  constructor(
    private _navCtrl: NavController,
    private _navParams: NavParams,
    private _fileTrasfer: FileTransfer,
    private _storage: Storage,
    private _toast: ToastController
  ) {}

  ionViewDidLoad() {
    this._storage.get("token").then(token => {
      const url = `${environment.api}/clients/quotations/upload`;
      const uri = this._navParams.data.uri;
      const inquiryId = this._navParams.data.inquiryId;
      const options: FileUploadOptions = {
        fileKey: "quotation",
        fileName: "quotation.pdf",
        mimeType: "application/pdf",
        params: { inquiryId },
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const fileTransfer: FileTransferObject = this._fileTrasfer.create();

      fileTransfer.onProgress(ev => {
        this.percent = ev.loaded / ev.total * 100;
      });

      fileTransfer
        .upload(uri, url, options)
        .then(resp => {
          this._toast
            .create({
              message: "Upload Successfully",
              position: "bottom",
              duration: 2000
            })
            .present();
          this._navCtrl.pop();
        })
        .catch(err => {
          this._toast
            .create({
              message: "Upload Failed",
              position: "bottom",
              duration: 2000
            })
            .present();
          this._navCtrl.pop();
        });
    });
  }
}
