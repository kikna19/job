import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import {SingupInfoComponent} from "./auth/components/singup-info/singup-info.component";
import {SignupSuccessComponent} from "./auth/components/signup-success/signup-success.component";
import {ProfileComponent} from "./auth/components/profile-info/profile.component";

const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent,
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
    path: 'auth/profile-info',
    component: ProfileComponent,
  },
  // {
  //   path: '',
  //   component: LayoutComponent,
  //   children: [
  //     { path: '', component: LandingComponent },
  //   ]
  // },
  // {
  //   path: 'auth',
  //   redirectTo: 'auth/login',
  //   pathMatch: 'full',
  // },
  // // {
  // //   path: 'auth/login',
  // //   component: LoginComponent,
  // // },
  // {
  //   path: 'auth/signup',
  //   // component: SignupComponent,
  // },
  // {
  //   path: 'auth/signup-info',
  //   // component: SingupInfoComponent,
  // },
  // {
  //   path: 'auth/signup-status',
  //   // component: SignupSuccessComponent,
  // },
  // {
  //   path: 'auth/password-reset',
  //   // component: PasswordResetComponent,
  // },
  // {
  //   path: 'auth/verification-code',
  //   // component: CodeVerificationComponent,
  // },
  // {
  //   path: 'auth/new-password',
  //   // component: PasswordChangeComponent,
  // },
  //
  // {
  //   path: 'profile-info',
  //   component: ProfileComponent,
  // },
  //
  // {
  //   path: 'profile-info/change-password',
  //   component: PasswordChageInfoComponent
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
