import { ProfileComponent } from './auth/components/profile-info/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeVerificationComponent } from './auth/components/code-verification/code-verification.component';
import { LoginComponent } from './auth/components/login/login.component';
import { PasswordChangeComponent } from './auth/components/password-change/password-change.component';
import { PasswordResetComponent } from './auth/components/password-reset/password-reset.component';
import { SignupSuccessComponent } from './auth/components/signup-success/signup-success.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { SingupInfoComponent } from './auth/components/singup-info/singup-info.component';
import { LandingComponent } from './shared/components/layout/landing/landing.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import {
  PasswordChageInfoComponent
} from "./auth/components/profile-info/password-chage-info/password-chage-info.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: LandingComponent },
    ]
  },
  {
    path: 'auth',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/signup',
    component: SignupComponent,
  },
  {
    path: 'auth/signup-info',
    component: SingupInfoComponent,
  },
  {
    path: 'auth/signup-status',
    component: SignupSuccessComponent,
  },
  {
    path: 'auth/password-reset',
    component: PasswordResetComponent,
  },
  {
    path: 'auth/verification-code',
    component: CodeVerificationComponent,
  },
  {
    path: 'auth/new-password',
    component: PasswordChangeComponent,
  },

  {
    path: 'profile-info',
    component: ProfileComponent,
  },

  {
    path: 'profile-info/change-password',
    component: PasswordChageInfoComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
