import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfileInfoService {

  constructor(
    private http: HttpClient
  ) { }


  refreshToken(){
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'application/json',
    });
    const body = JSON.stringify({
      "email": "kiknadzevazha@gmail.com",
      "refreshToken": "3EFAAC71DFE377EFB91094EF081CD66DE0BB2B1A4B547AD30F28439592A8BC7F964295D2DF11C131"
    })
    return this.http.post('https://jobboard.admi.ge/api/api/v1/account/refresh-token',body, {headers: headers})
  }

  getFullInfo(){
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbF9hZGRyZXNzIjoia2lrbmFkemV2YXpoYUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsInN1YiI6IjQybDBBM1prYkRtIiwibmJmIjoxNjY2OTY4MDI3LCJleHAiOjE2NjY5NzE2MjcsImlzcyI6ImpvYmJvYXJkLmFwaSIsImF1ZCI6ImpvYmJvYXJkLnVzZXIifQ.uPL4Jp_Rxd6SwJfdYWnSYYHddcE3PShr9qnrua-BroI'

    })
   return this.http.get('https://jobboard.admi.ge/api/api/v1/account/own-profile', {headers: headers})
  }
}
