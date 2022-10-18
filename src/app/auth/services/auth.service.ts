import { Injectable } from '@angular/core';
import { catchError, mapTo, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User, SignUpResponse, LoginResponse, passwordResetResponse, codeValidationResponse, newPasswordResponse, Tokens } from '../models/user';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService { 
  private apiUrl: string = environment.apiBaseUrl + '/User';

  constructor(private http: HttpClient,private jwtHelper: JwtHelperService) { }

  logIn(email: string, password: string): Observable<any> {
    const request = {
      Username: '' + email,
      Password: '' + password
    };
    return this.http.post<LoginResponse>(this.apiUrl + '/Login', { request })
  }

  signUp(firstName: string, lastName: string, phoneNumber: string, email: string, password: string, role: string): Observable<any> {
    const request = {
      FirstName: '' + firstName,
      LastName: '' + lastName,
      PhoneNumber: '' + phoneNumber,
      Email: '' + email,
      Password: '' + password,
      RoleName: '' + 'Candidate',
    };
    return this.http.post<SignUpResponse>(this.apiUrl + '/AddUser', { request });
  }
  
  externalLogIn(data: any): Observable<any> {   
    const userData = {
      LoginProvider: '' + data.provider,
      ProviderKey: '' + data.id,
      AuthToken: '' + data.authToken,
      Email: '' + data.email,
      FirstName: '' + data.firstName,
      LastName: '' + data.lastName,
    };
    return this.http.post<SignUpResponse>(this.apiUrl + '/ExternalLogin', { userData });
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post<passwordResetResponse>(this.apiUrl + '/SendMail', { email: email });
  }

  checkCodeValidation(email: string, code: string): Observable<any> {
    return this.http.post<codeValidationResponse>(this.apiUrl + '/ValidateCode', { email: email, code: code });
  }
  
  setNewPassword(email: string, password: string): Observable<any> {
    return this.http.post<newPasswordResponse>(this.apiUrl + '/ChangePassword', { email: email, password: password });
  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt"); 
    if (token && !this.jwtHelper.isTokenExpired(token)){    
      return true;
    }
    return false;
  }

  // refreshToken() {
  //   return this.http.post<any>(this.apiUrl + '/refresh', {
  //     'refreshToken': this.getRefreshToken()
  //   }).pipe(tap((tokens: Tokens) => {
  //     this.storeJwtToken(tokens.jwt);
  //   }));
  // }

}
