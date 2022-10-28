import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginResponse } from '../models/user.state';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private jwtHelper: JwtHelperService) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      //   let token = localStorage.getItem("jwt");
      //   if (token && !this.jwtHelper.isTokenExpired(token)){
      //     return true;
      //   }
      //   const isRefreshSuccess = await this.tryRefreshingTokens(token as any);
      //   if (!isRefreshSuccess) {
      //     this.router.navigate(["login"]);
      //   }
      //   return isRefreshSuccess;
      // }
      //
      // private async tryRefreshingTokens(token: string): Promise<boolean> {
      //   let refreshToken: string = localStorage.getItem("refreshToken") as any;
      //   if (!token || !refreshToken) {
      //     return false;
      //   }
      //
      //   const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
      //   let isRefreshSuccess: boolean;
      //
      //   const refreshRes = await new Promise<LoginResponse>((resolve, reject) => {
      //   //   this.http.post<LoginResponse>("https://localhost:5001/api/token/refresh", credentials, {
      //   //     headers: new HttpHeaders({
      //   //       "Content-Type": "application/json"
      //   //     })
      //   //   }).subscribe({
      //   //     next: (res: LoginResponse) => resolve(res),
      //   //     error: (_) => { reject; isRefreshSuccess = false;}
      //   //   });
      //   });
      //
      //   localStorage.setItem("jwt", refreshRes.token);
      //   localStorage.setItem("refreshToken", refreshRes.refreshToken);
      //   isRefreshSuccess = true;
      //
      //   return isRefreshSuccess;
      return true
      }
}
