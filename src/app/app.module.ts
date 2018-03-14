import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

import * as fromConfigHelpers from "./../config";
import * as fromPages from "./../pages";
import * as fromComponents from "./../components";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { File } from "@ionic-native/file";

import { IonicStorageModule } from "@ionic/storage";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { Api } from "./../api";
import { UserConfigService } from "./../user-store/services";
import { reducers } from "./../root-store/root.reducer";
import { effects } from "./../root-store/root.effect";

import { FileChooser } from "@ionic-native/file-chooser";
import { FileTransfer } from "@ionic-native/file-transfer";

@NgModule({
  declarations: [MyApp, ...fromPages.pages, ...fromComponents.components],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([...effects]),
    StoreDevtoolsModule.instrument({
      maxAge: 10 // Retains last 25 states
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, ...fromPages.pages],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    FileChooser,
    FileTransfer,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: fromConfigHelpers.HttpConfigInterceptorService,
      multi: true
    },
    Api,
    UserConfigService,
    ...fromConfigHelpers.configHelpers,
    ...fromPages.services
  ]
})
export class AppModule {}
