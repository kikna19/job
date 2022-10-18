import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LandingComponent } from './components/layout/landing/landing.component';
import { LayoutComponent } from './components/layout/layout.component';
import {SocialLoginModule} from "@abacritt/angularx-social-login";
import {AlertModule} from "../alert/alert.module";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    LayoutComponent,

  ],
  imports: [
    CommonModule,
    SocialLoginModule,
    AlertModule,
    HttpClientModule,
     RouterModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    LayoutComponent
  ]
})
export class SharedModule { }
