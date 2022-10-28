import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Country {
  name: string;
  callingCodes: string;
  flag: string;
  alpha3Code: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountryAllService {


  constructor(
    private http: HttpClient
  ) {
  }

  getCountryCodes(): Observable<Country[]> {
    return this.http.get<Country[]>('https://restcountries.com/v2/all');
  }
}
