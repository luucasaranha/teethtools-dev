import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {getRemoteConfig, provideRemoteConfig} from '@angular/fire/remote-config';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {SystemUnavailableComponent} from './system-unavailable/system-unavailable.component';
import {provideAuth, getAuth} from '@angular/fire/auth'
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {LoadingInterceptorService} from "./dashboard/services/interceptor/loading-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    SystemUnavailableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideRemoteConfig(() => getRemoteConfig()),
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    provideAuth(() => getAuth()),
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;
