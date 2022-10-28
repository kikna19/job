import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Country, CountryAllService} from "../../../../shared/services/country-all.service";
import {Observable} from "rxjs";
import {UserState} from "../../../models/user.state";
import {ProfileInfoService} from "../../../services/profile-info.service";

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  user: any;
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

  constructor(
    private countriesService: CountryAllService,
    private profileInfoService: ProfileInfoService
  ) {
  }

  ngOnInit(): void {
    this.countriesService.getCountryCodes()
      .subscribe(
        res => {
          this.countries = res;
          const defaultCountry: Country = <Country>this.countries.find((item: Country) => item.name === 'Netherlands');
          this.imgUrl = defaultCountry.flag;
          this.callingCode = '+' + defaultCountry.callingCodes;
          this.nameCode = defaultCountry.name;
          this.countriesCopy = this.countries;
        }
      );
    this.user = this.profileInfoService.getFullInfo().subscribe();

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
  }

  editFormControl(form: FormGroup, control: string): void {
    form.get(control)?.enable();
  }

  updateFormControlValue(elementId: any, form: FormGroup, control: string): void {
    elementId.classList.remove('border-r', 'rounded-br-md', 'rounded-tr-md');
  }

  saveFormControl(form: FormGroup, control: string): void {
    form.get(control)?.disable();
  }

  savePhone() {
    this.saveFormControl(this.form, 'phone');
    this.form.get('country')?.setValue([
      this.callingCodeVal.nativeElement.innerHTML,
      this.nameCodeVal.nativeElement.innerHTML,
    ]);
    this.saveFormControl(this.form, 'country');

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

  log(a: any) {
    console.log(a);
  }

}
