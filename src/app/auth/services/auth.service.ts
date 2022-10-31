import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginResponse, SignUpResponse} from '../models/user.state';
import {environment} from 'src/environments/environment.prod';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  private apiUrl: string = environment.apiBaseUrl;
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json',
    })
  }

  logIn(
    email: string,
    password: string
  ): Observable<any> {

    const body = JSON.stringify({
      "email": "kiknadzevazha@gmail.com",
      "password": "asdfas1234",
      // "email": "vazhakiknadze111@ens.tsu.edu.ge",
      // "password": "12345678"
    })
    return this.http.post<LoginResponse>('https://jobboard.admi.ge/api/api/v1/account/login', body, {headers: this.headers})
  }

  signUp(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string,
    cv?: string | null
  ): Observable<any> {
    const body = JSON.stringify({
      // "firstName": `${firstName}`,
      // "lastName": `${lastName}`,
      // "password": `${password}`,
      // "phoneNumber": `${phoneNumber}`,
      // "email": `${email}`,
      // "uploadedCvId": `${cv}`,
      "firstName": "gio",
      "lastName": "gio",
      "password": "12345678",
      "phoneNumber": "995574079685",
      "email": "vazhakiknadze111@ens.tsu.edu.ge",
      "uploadedCvId": "string"
    })
    return this.http.post<SignUpResponse>('https://jobboard.admi.ge/api/api/v1/account/register-candidate', body, {headers: this.headers});
  }


  confirmAccount(id: string, code: string) {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json',
    });
    const body = JSON.stringify({
      "id": id,
      "code": code
    })
    return this.http.post('https://jobboard.admi.ge/api/api/v1/account/confirm-account', body, {headers: headers})
  }


  forgotPassword(email: string) {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json',
    });
    const body = JSON.stringify({
      "email": "vazhiko199@gmail.com"
    })
    return this.http.post('https://jobboard.admi.ge/api/api/v1/account/forgot-password', body, {headers: headers})
  }

  resetPassword(email: string, code: string, newPassword: string) {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json',
    });
    const body = JSON.stringify({
      "email": email,
      "code": code,
      "password": "qwertyu1235)",
    })
    return this.http.post('https://jobboard.admi.ge/api/api/v1/account/reset-password', body, {headers: headers})
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
    return this.http.post<SignUpResponse>(this.apiUrl + '/ExternalLogin', {userData});
  }

  // resetPassword(email: string): Observable<any> {
  //   return this.http.post<passwordResetResponse>(this.apiUrl + '/SendMail', {email: email});
  // }
  //
  // checkCodeValidation(email: string, code: string): Observable<any> {
  //   return this.http.post<codeValidationResponse>(this.apiUrl + '/ValidateCode', {email: email, code: code});
  // }
  //
  // setNewPassword(email: string, password: string): Observable<any> {
  //   return this.http.post<newPasswordResponse>(this.apiUrl + '/ChangePassword', {email: email, password: password});
  // }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
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
