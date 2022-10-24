import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SingupInfoComponent } from './components/singup-info/singup-info.component';
import { AuthService } from './services/auth.service';
import { CodeVerificationComponent } from './components/code-verification/code-verification.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { ProfileComponent } from './components/profile-info/profile.component';
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {SignupSuccessComponent} from "./components/signup-success/signup-success.component";
import {SharedModule} from "../shared/shared.module";
import {SocialLoginModule} from "@abacritt/angularx-social-login";
import {AlertModule} from "../alert/alert.module";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import { PersonalInfoComponent } from './components/profile-info/personal-info/personal-info.component';
import { WorkExperieceComponent } from './components/profile-info/work-experiece/work-experiece.component';
import { CurrentSituationComponent } from './components/profile-info/current-situation/current-situation.component';
import { CvComponent } from './components/profile-info/cv/cv.component';
import { ECvComponent } from './components/profile-info/e-cv/e-cv.component';
import {CountryAllService} from "../shared/services/country-all.service";
import {PasswordResetComponent} from "./components/password-reset/password-reset.component";

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
  PersonalInfoComponent,
  WorkExperieceComponent,
  CurrentSituationComponent,
  CvComponent,
  ECvComponent,
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
  providers: [AuthService, CountryAllService],
})
export class AuthModule { }
