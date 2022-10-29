import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from "@angular/forms";
import {Country, CountryAllService} from "../../../../shared/services/country-all.service";
import {concatMap, distinctUntilChanged, map, Observable, Subscription, switchMap, take} from "rxjs";
import {PersonalInfo, UserState} from "../../../models/user.state";
import {ProfileInfoService, UserInfo} from "../../../services/profile-info.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit, OnDestroy {
  country$: Subscription;
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
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {


    // this.profileInfoService.refreshToken().subscribe(console.log)

// this.authService.logIn('','').subscribe(console.log)

    this.userInfo$ = this.profileInfoService.getFullInfo().pipe(
      map((user: any): void => {
        this.setControlValues(this.form, user);
      }),
    ).subscribe();
    this.country$ = this.countriesService.getCountryCodes()
      .subscribe(
        res => {
          this.countries = res;
          const defaultCountry: Country = <Country>this.countries.find((item: Country) => item.name === 'Netherlands');
          this.imgUrl = defaultCountry.flag;
          this.callingCode = '+' + defaultCountry.callingCodes[0];
          this.savePhone(this.callingCode);
          this.nameCode = defaultCountry.name;
          this.countriesCopy = this.countries;
        }
      );
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
    this.nameCode = name;
    this.showDropdown = false;
    this.savePhone(this.callingCode[0]);
  }

  editFormControl(form: FormGroup, control: string): void {
    form.get(control)?.enable();
  }


  updateUserInfo(form: FormGroup, control: string, controlValue: string): void {
    this.profileInfoService.updateUser(control, controlValue).pipe(
      map((user: any): void => {
        this.setControlValues(this.form, user);
        form.get(control)?.disable();
      }),
    )
      .subscribe();
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
        form.get(c)?.setValue(user?.phoneNumber)
      if (c === 'email')
        form.get(c)?.setValue(user?.email)
      if (c === 'city')
        form.get(c)?.setValue(user.city?.friendlyName)
    });
    this.disableInput(form);
  }

  ngOnDestroy() {
    this.userInfo$.unsubscribe();
    this.country$.unsubscribe();
  }


}
