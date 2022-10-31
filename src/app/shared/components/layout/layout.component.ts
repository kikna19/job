import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as AuthActions from '../../../state/auth/auth.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  routeSubscription: Subscription;
  code: string | null;
  constructor(private store: Store,private http: HttpClient,private route: ActivatedRoute) { }

  ngOnInit(): void {



    this.route.queryParams
      .subscribe(params => {
        if (params['code']) {
          var link = 'https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&client_id=77h3elhxwkkicl&client_secret=OP01e2bnvZz2bFP0&code=' + params['code'] + '&redirect_uri=https://jobboard.admi.ge/';
          this.http.get<any>(link, {}).subscribe(x => {
            console.log('acces token'+x);
            var url = "https://api.linkedin.com/v2/me?oauth2_access_token=" + x.access_token;
            this.http.get<any>(url, {}).subscribe(n => {
              console.log('data'+n)
              // this.store.dispatch(AuthActions.externalLoginRequest({
              //   credentials: {
              //     provider: 'LINKEDIN', id: profile-info.getId(), authToken: googleAuthUser.getAuthResponse().id_token,
              //     email: profile-info.getEmail(), firstName: profile-info.getGivenName(), lastName: profile-info.getFamilyName()
              //  }
              // })
              // );
            })
          }
          );
        }
      }
      );
  }
}
