import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {AuthService} from './services/auth.service';
import {ProfileComponent} from './components/profile-info/profile.component';
import {SharedModule} from "../shared/shared.module";
import {SocialLoginModule} from "@abacritt/angularx-social-login";
import {AlertModule} from "../alert/alert.module";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {PersonalInfoComponent} from './components/profile-info/personal-info/personal-info.component';
import {WorkExperieceComponent} from './components/profile-info/work-experiece/work-experiece.component';
import {CurrentSituationComponent} from './components/profile-info/current-situation/current-situation.component';
import {CvComponent} from './components/profile-info/cv/cv.component';
import {ECvComponent} from './components/profile-info/e-cv/e-cv.component';
import {SingupInfoComponent} from "./components/singup-info/singup-info.component";
import { SignupSuccessComponent } from './components/signup-success/signup-success.component';
import {HttpClientModule} from "@angular/common/http";
import { ConfirmComponent } from './components/confirm-account/confirm.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';


@NgModule({
  declarations: [
    ProfileComponent,
    LoginComponent,
    SignupComponent,
    SingupInfoComponent,
    PersonalInfoComponent,
    WorkExperieceComponent,
    CurrentSituationComponent,
    CvComponent,
    ECvComponent,
    SignupSuccessComponent,
    ConfirmComponent,
    ResetPasswordComponent,
  ],
  imports: [
    SharedModule,
    SocialLoginModule,
    AlertModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
})
export class AuthModule {
}
