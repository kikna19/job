import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Country, CountryAllService} from "../../../../shared/services/country-all.service";
import {concatMap, map, Observable, Subscription} from "rxjs";
import {PersonalInfo} from "../../../models/user.state";
import {ProfileInfoService} from "../../../services/profile-info.service";
import {AuthService} from "../../../services/auth.service";
import {Store} from "@ngrx/store";
import {UpdateUserInfo} from "../../../../state/personal-info/info.actions";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit, OnDestroy {
  user: PersonalInfo;
  country$: Observable<any>;
  userInfo$: Subscription;
  countries: Country[];
  private countriesCopy: Country[] = [];
  @Input() form: FormGroup;
  imgUrl: string;
  callingCode: string;
  nameCode: string;
  fullName: string;
  showDropdown: boolean = false;
  @ViewChild('dropText', {static: false}) drop: ElementRef;
  @ViewChild('callingCodeVal', {static: false}) callingCodeVal: ElementRef;
  @ViewChild('nameCodeVal', {static: false}) nameCodeVal: ElementRef;
  @ViewChild('phone', {static: false}) phone: ElementRef;
  formControls: string[] = ['firstName', 'lastName', 'phone', 'password', 'email', 'city'];

  constructor(
    private countriesService: CountryAllService,
    private profileInfoService: ProfileInfoService,
    private authService: AuthService,
    private store: Store,
  ) {
  }

  ngOnInit(): void {




    // this.profileInfoService.refreshToken().subscribe(console.log)

    // this.authService.logIn('','').subscribe(console.log)

    // this.profileInfoService.confirmEmail().subscribe(console.log)

    this.userInfo$ = this.profileInfoService.getFullInfo().pipe(
      map((user: any): void => {
        this.user = user;
        console.log(this.user);
        console.log(this.user.phoneNumber.substring(0, this.user.phoneNumber.indexOf(' ')));
        this.setControlValues(this.form, user);
      }),
      concatMap(_ => this.country$),
    ).subscribe();
    this.country$ = this.countriesService.getCountryCodes().pipe(
      map(res => {
        this.countries = res;
        const defaultCountry: Country = <Country>this.countries
          .find((item: Country) =>
            item.callingCodes[0] === this.user.phoneNumber.substring(0, this.user.phoneNumber.indexOf(' ')));
        this.imgUrl = defaultCountry.flag;
        this.callingCode = '+' + defaultCountry.callingCodes[0];
        this.savePhone(defaultCountry.callingCodes[0]);
        this.nameCode = defaultCountry.name;
        this.countriesCopy = this.countries;
      })
    )
  }

  disableInput(form: FormGroup): void {
    this.formControls.forEach(c => {
      if (form.get(c)?.value)
        form.get(c)?.disable();
    });
  }


  openDropdown(): void {
    this.showDropdown = true;
  }

  searchCountry(e: any): void {
    if (e.target.value !== null &&
      e.target.value !== undefined &&
      e.target.value.trim().length > 0) {
      const name = e.target.value.trim().toLowerCase();
      this.countries = this.countriesCopy.filter(country =>
        country.name.toLowerCase().includes(name) ||
        country.callingCodes[0].includes(name) ||
        country.alpha3Code.toLowerCase().includes(name));
    } else {
      this.countries = this.countriesCopy;
    }
  }

  selectCountry(imgUrl: string, code: string, name: string): void {
    this.imgUrl = imgUrl;
    this.callingCode = '+' + code;
    this.savePhone(code[0]);
    this.nameCode = name;
    this.showDropdown = false;
    this.countries = this.countriesCopy;
  }

  editFormControl(form: FormGroup, control: string): void {
    form.get(control)?.enable();
  }


  updateUserInfo(form: FormGroup, control: string, controlValue: string): void {
    const phoneVal = this.form.get('country')?.value + ' ' + controlValue;
    console.log(phoneVal);
    if (control === 'phone') {
      this.store.dispatch(new UpdateUserInfo({
          control: control,
          value: phoneVal,
        })
      );
    } else
      this.store.dispatch(new UpdateUserInfo({
          control: control,
          value: controlValue,
        })
      );
    form.get(control)?.disable();
  }

  savePhone(countryValue: string): void {
    this.form.get('country')?.setValue(countryValue);
    this.form.get('country')?.disable();
  }


  get(form: FormGroup, formControl: string): boolean {
    return !!(
      form.get(formControl)?.touched &&
      form.get(formControl)?.invalid
    );
  }

  checkDisable(form: FormGroup, control: string): boolean {
    return !!form.get(control)?.disabled;
  }


  setControlValues(form: FormGroup, user: PersonalInfo): void {
    this.formControls.forEach((c: any) => {
      if (c === 'firstName')
        form.get(c)?.setValue(user?.firstName)
      if (c === 'lastName')
        form.get(c)?.setValue(user?.lastName)
      if (c === 'phone')
        form.get(c)?.setValue(user?.phoneNumber.substring(user?.phoneNumber.indexOf(' ') + 1));
      if (c === 'email')
        form.get(c)?.setValue(user?.email)
      if (c === 'city')
        form.get(c)?.setValue(user.city?.friendlyName)
    });
    this.disableInput(form);
  }

  ngOnDestroy() {
    this.userInfo$.unsubscribe();
  }


}
