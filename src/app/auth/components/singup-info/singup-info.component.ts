import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from 'src/app/alert/alert.service';
import {Subscription} from 'rxjs';
import {SignUpRequest} from "../../../state/auth/auth.actions";
import {Country, CountryAllService} from "../../../shared/services/country-all.service";
import {FormValidator} from "../../../shared/validators/form.validator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-singup-info',
  templateUrl: './singup-info.component.html',
  styleUrls: ['./singup-info.component.scss']
})
export class SingupInfoComponent implements OnInit {
  error$ = this.store.select(state => state);
  public signupForm: FormGroup;
  subscription: Subscription;
  country$: Subscription;
  countries: Country[];
  private countriesCopy: Country[] = [];
  imgUrl: string;
  callingCode: string;
  nameCode: string;
  fullName: string;
  showDropdown: boolean = false;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private alert: AlertService,
    private countriesService: CountryAllService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [undefined, Validators.required],
      country: [undefined, Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")]],
      repeatPassword: ['', Validators.required],
      cv: [undefined]
    }, {validators: FormValidator.passwordNoMatch})
  }

  ngOnInit(): void {
    this.country$ = this.countriesService.getCountryCodes()
      .subscribe(
        res => {
          this.countries = res;
          const defaultCountry: Country = <Country>this.countries.find((item: Country) => item.name === 'Netherlands');
          this.imgUrl = defaultCountry.flag;
          this.callingCode = '+' + defaultCountry.callingCodes[0];
          this.signupForm.get('country')?.setValue(defaultCountry.callingCodes[0]);
          this.nameCode = defaultCountry.name;
          this.countriesCopy = this.countries;
        }
      );
    this.subscription = this.error$.subscribe((message: any) => {
      this.alert.error(message!);
    });

  }

  async onSubmitUserDetails(): Promise<any> {

    this.router.navigateByUrl('/auth/signup-status');
    const countryCode = this.signupForm.get('country')?.value;
    const controls: any[] = <any>this.signupForm.controls;
    const [
      firstName,
      lastName,
      phone,
      ,
      email,
      password,
    ]: string[] = Object.keys(controls).map((key: any) => controls[key].value);
    if (this.signupForm.valid) {
      console.log({
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email,
        phoneNumber: countryCode + ' ' + phone,
        cv: '',
      })
      // this.store.dispatch(new SignUpRequest({
      //   firstName: firstName,
      //   lastName: lastName,
      //   password: password,
      //   email: email,
      //   phoneNumber: countryCode + ' ' + phone,
      //   cv: '',
      // }));
    }
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
    this.callingCode = '+' + code[0];
    this.signupForm.get('country')?.setValue(code[0]);
    this.nameCode = name;
    this.showDropdown = false;
    this.countries = this.countriesCopy;
  }


  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
