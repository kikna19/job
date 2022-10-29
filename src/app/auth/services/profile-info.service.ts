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
      "refreshToken": "9767CC471C7E4A2C8E2FFAA35606E4506B2BD304C191D0B55DA9F5825A38BA0E6C5E99C307AAA82A",
    })
    return this.http.post('https://jobboard.admi.ge/api/api/v1/account/refresh-token', body, {headers: headers})
  }

  getFullInfo() {
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbF9hZGRyZXNzIjoia2lrbmFkemV2YXpoYUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsInN1YiI6IjQybDBBM1prYkRtIiwibmJmIjoxNjY3MDUzMTcyLCJleHAiOjE2NjcwNTY3NzIsImlzcyI6ImpvYmJvYXJkLmFwaSIsImF1ZCI6ImpvYmJvYXJkLnVzZXIifQ.jdZwIVGFUGdFSqySnHGuopIpVTM78KMMLlXJZZB16bM'
    })
    return this.http.get('https://jobboard.admi.ge/api/api/v1/account/own-profile', {headers: headers})
  }

  updateUser(query: string, value: string): Observable<any> {
    const UPDATE_URL = 'https://jobboard.admi.ge/api/api/v1/user-info/update-';
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbF9hZGRyZXNzIjoia2lrbmFkemV2YXpoYUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsInN1YiI6IjQybDBBM1prYkRtIiwibmJmIjoxNjY3MDUzMTcyLCJleHAiOjE2NjcwNTY3NzIsImlzcyI6ImpvYmJvYXJkLmFwaSIsImF1ZCI6ImpvYmJvYXJkLnVzZXIifQ.jdZwIVGFUGdFSqySnHGuopIpVTM78KMMLlXJZZB16bM'
    });
    switch (query) {
      case 'firstName': {
        return this.http.put(`${UPDATE_URL}firstname`, {"firstname": `${value}`}, {headers: headers})
      }
      case 'lastName': {
        console.log(query + ' +');
        return this.http.put(`${UPDATE_URL}lastname`, {"lastname": `${value}`}, {headers: headers})
      }
      case 'city': {
        return this.http.put(`${UPDATE_URL}city`, {"cityName": `${value}`}, {headers: headers})
      }
      case 'phone': {
        return this.http.put(`${UPDATE_URL}phone`, {"phoneNumber": `${value}`}, {headers: headers})
      }
      default:
        return of(null);
    }

  }
}
