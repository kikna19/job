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
import { User } from 'src/app/auth/models/user';
import { AuthService } from 'src/app/auth/services/auth.service';
import * as AuthActions from 'src/app/state/auth/auth.actions';
import { selectToken, selectUser } from 'src/app/state/auth/auth.reducer';
 '.';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private store: Store,public auth: AuthService,private socialAuthService: SocialAuthService) {
  }
  ngOnInit(): void { 
  }

  logout(){
    this.socialAuthService.signOut();
    this.store.dispatch(AuthActions.logout());
    
  }
}
