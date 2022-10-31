import { SocialAuthService } from '@abacritt/angularx-social-login';
import {
  animate,
  AUTO_STYLE,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserState } from 'src/app/auth/models/user.state';
import { AuthService } from 'src/app/auth/services/auth.service';
import * as AuthActions from 'src/app/state/auth/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean = !!localStorage.getItem('jwt');
  constructor(private store: Store,public auth: AuthService,private socialAuthService: SocialAuthService) {
  }
  ngOnInit(): void {
  }

  logout(){
    this.socialAuthService.signOut();
    // this.store.dispatch(AuthActions.logout());

  }
}
