import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';


import {AuthService} from './auth/services/auth.service';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './state/auth/auth.effects';
import {HttpClientModule} from '@angular/common/http';
import {AlertService} from './alert/alert.service';
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import {FacebookLoginProvider, SocialAuthServiceConfig,} from '@abacritt/angularx-social-login';

import {JwtModule} from "@auth0/angular-jwt";
import {AuthGuard} from './auth/guards/authguard';
import {CommonModule} from "@angular/common";
import {AuthModule} from "./auth/auth.module";
import {SharedModule} from "./shared/shared.module";
import {appReducers, metaReducers} from "./state/app/app.reducers";
import {InfoEffects} from "./state/personal-info/info.effects";
import {RouterModule} from "@angular/router";

// const googleLoginOptions: GoogleInitOptions = {
//   oneTapEnabled: false,
//   scopes: 'https://www.googleapis.com/auth/calendar.readonly'
// };
export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(appReducers,  {
      metaReducers,
      runtimeChecks: {
        // strictStateImmutability and strictActionImmutability are enabled by default
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    EffectsModule.forRoot([AuthEffects, InfoEffects]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["https://jobboard.admi.ge/"],
        disallowedRoutes: []
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [
    AuthGuard,
    AuthService,
    AlertService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            //real
            provider: new FacebookLoginProvider('431147349080206'),

            //test
            //provider: new FacebookLoginProvider('431147349080206'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    SharedModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}
