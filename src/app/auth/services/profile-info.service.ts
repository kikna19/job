import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PersonalInfo} from "../models/user.state";
import {Observable, of} from "rxjs";

export type UserInfo = Pick<PersonalInfo, "firstName" | "lastName" | "phoneNumber" | "city">;

@Injectable({
  providedIn: 'root'
})
export class ProfileInfoService {

  constructor(
    private http: HttpClient
  ) {
  }


  refreshToken() {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json',
    });
    const body = JSON.stringify({
      "email": "kiknadzevazha@gmail.com",
      "refreshToken": "FAC0A5CDD26CA98A3C0535196414091C988BF47250DF42535F08965912E360A8B0E96DEBE545B1A2",
    })
    return this.http.post('https://jobboard.admi.ge/api/api/v1/account/refresh-token', body, {headers: headers})
  }

  getFullInfo() {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbF9hZGRyZXNzIjoia2lrbmFkemV2YXpoYUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsInN1YiI6IjQybDBBM1prYkRtIiwibmJmIjoxNjY3MTYyMjIyLCJleHAiOjE2NjcxNjU4MjIsImlzcyI6ImpvYmJvYXJkLmFwaSIsImF1ZCI6ImpvYmJvYXJkLnVzZXIifQ.00M1VtRWGIWzl67YF0ZPa8uy-W33I0zGDu58Jc9M1LU'
    })
    return this.http.get('https://jobboard.admi.ge/api/api/v1/account/own-profile', {headers: headers})
  }

  updateUser(query: string, value: string): Observable<any> {
    const UPDATE_URL = 'https://jobboard.admi.ge/api/api/v1/user-info/update-';
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbF9hZGRyZXNzIjoia2lrbmFkemV2YXpoYUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsInN1YiI6IjQybDBBM1prYkRtIiwibmJmIjoxNjY3MTYyMjIyLCJleHAiOjE2NjcxNjU4MjIsImlzcyI6ImpvYmJvYXJkLmFwaSIsImF1ZCI6ImpvYmJvYXJkLnVzZXIifQ.00M1VtRWGIWzl67YF0ZPa8uy-W33I0zGDu58Jc9M1LU'
    });
    switch (query) {
      case 'firstName': {
        return this.http.put(`${UPDATE_URL}firstname`, {"firstname": `${value}`}, {headers: headers})
      }
      case 'lastName': {
        return this.http.put(`${UPDATE_URL}lastname`, {"lastname": `${value}`}, {headers: headers})
      }
      case 'city': {
        return this.http.put(`${UPDATE_URL}city`, {"cityName": `${value}`}, {headers: headers})
      }
      case 'phone': {
        return this.http.put(`${UPDATE_URL}phone`, {"phoneNumber": `${value}`}, {headers: headers})
      }
      case 'country': {
        return this.http.put(`${UPDATE_URL}phone`, {"phoneNumber": `${value}`}, {headers: headers})
      }
      default:
        return of(null);
    }

  }
}
