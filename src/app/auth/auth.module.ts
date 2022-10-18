import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SingupInfoComponent } from './components/singup-info/singup-info.component';
import { AuthService } from './services/auth.service';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { CodeVerificationComponent } from './components/code-verification/code-verification.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { ProfileComponent } from './components/profile/profile.component';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {SignupSuccessComponent} from "./components/signup-success/signup-success.component";
import {SharedModule} from "../shared/shared.module";
import {SocialLoginModule} from "@abacritt/angularx-social-login";
import {AlertModule} from "../alert/alert.module";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

const COMPONENTS = [
  LoginComponent,
  SignupComponent,
  SingupInfoComponent,
  PasswordResetComponent,
  CodeVerificationComponent,
  PasswordChangeComponent,
  ProfileComponent,
  SignupSuccessComponent,
]

@NgModule({
  declarations: [
  COMPONENTS,
  ],
  imports: [
    SharedModule,
    SocialLoginModule,
    AlertModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    COMPONENTS,
  ],
  providers: [AuthService],
})
export class AuthModule { }
