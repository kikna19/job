declare var google: any;
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AlertService } from 'src/app/alert/alert.service';
import * as AuthActions from '../../../state/auth/auth.actions';
import { AuthService } from '../../services/auth.service';
import { catchError, Observable, Subscription } from 'rxjs';
import { ActivatedRoute,Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  error$ = this.store.select(state => state);
  subscription: Subscription;
  routeSubscription: Subscription;
  socialUser!: SocialUser;
  code: string | null;

  auth2: any;
  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;
  constructor(private socialAuthService: SocialAuthService, private store: Store, private alert: AlertService, private test: AuthService, private route: ActivatedRoute, private http: HttpClient, private zone: NgZone) {

  }

  ngOnInit(): void {
    // this.googleAuthSDK();
    // this.subscription = this.error$.subscribe((message:any) => {
    //   this.alert.error(message);
    // });
  }

 // handleCredentialResponse(response: CredentialResponse) {
 //    let decodedToken: any | null = null;
 //    try {
 //      decodedToken = JSON.parse(atob(response?.credential.split('.')[1]));
 //    } catch (e) {
 //      console.error('Error while trying to decode token', e);
 //    } this.zone.run(()=>{
 //      this.store.dispatch(AuthActions.ExternalLoginRequest({
 //        credentials: {
 //          provider: 'GOOGLE', id: decodedToken.sub, authToken: decodedToken.jti,
 //          email: decodedToken.email, firstName: decodedToken.given_name, lastName: decodedToken.family_name
 //        }
 //      }))
 //    });
 //   ;
 //  }

  // externalLogin(platform: string): void {
  //   this.socialAuthService.signIn(platform).then((response) => {
  //     this.store.dispatch(AuthActions.ExternalLoginRequest({
  //       credentials: {
  //         provider: response.provider, id: response.id, authToken: response.authToken, email: response.email, firstName: response.firstName, lastName: response.lastName
  //       }
  //     }));
  //   })
  // }

  signinWithLinkedin(): void {
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77h3elhxwkkicl&scope=r_liteprofile&state=123456&redirect_uri=https://jobboard.admi.ge/`;
  }


  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }



  // callLogin() {
  //   this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
  //     (googleAuthUser: any) => {
  //       let profile = googleAuthUser.getBasicProfile();
  //       this.zone.run(() => {
  //         this.store.dispatch(AuthActions.ExternalLoginRequest({
  //           credentials: {
  //             provider: 'GOOGLE', id: profile.getId(), authToken: googleAuthUser.getAuthResponse().id_token,
  //             email: profile.getEmail(), firstName: profile.getGivenName(), lastName: profile.getFamilyName()
  //           }
  //         }));
  //       });
  //     }, (error: any) => {
  //        alert(JSON.stringify(error, undefined, 2));
  //     });
  //
  // }

  // googleAuthSDK() {
  //   (<any>window)['googleSDKLoaded'] = () => {
  //     (<any>window)['gapi'].load('auth2', () => {
  //       this.auth2 = (<any>window)['gapi'].auth2.init({
  //         //real client_id
  //         client_id: '419364057897-bn5o31m2rdk4m8lc5rcum6kvd077vd9d.apps.googleusercontent.com',
  //
  //         //test client_id
  //       //  client_id: '419364057897-pa0u3m1dhmv5c75hehqtnkuj5qovvshb.apps.googleusercontent.com',
  //         plugin_name: 'login',
  //         cookiepolicy: 'single_host_origin',
  //         scope: 'profile-info email',
  //         ux_mode: 'redirect'
  //       });
  //       this.callLogin();
  //     });
  //   }
  //
  //    (function (d, s, id) {
  //     var js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) { return; }
  //     js = d.createElement('script');
  //     js.id = id;
  //     js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
  //     fjs?.parentNode?.insertBefore(js, fjs);
  //   }(document, 'script', 'google-jssdk'));
  //
  // }
}

