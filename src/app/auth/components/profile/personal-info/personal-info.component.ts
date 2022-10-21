import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Country, CountryAllService} from "../../../../shared/services/country-all.service";

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  countries: Country[];
  private countriesCopy: Country[] = [];
  @Input() form: FormGroup;
  imgUrl: string;
  callingCode: string;
  nameCode: string;
  fullName: string;
  showDropdown: boolean = false;
  @ViewChild('dropText', {static: false}) drop: ElementRef;

  constructor(
    private countriesService: CountryAllService,
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
          this.countriesCopy = this.countries;
        }
      )
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

  selectCountry(imgUrl: string, code: string): void {
    this.imgUrl = imgUrl;
    this.callingCode = '+' + code;
    this.showDropdown = false;
  }

  editFormControl(form: FormGroup, control: string): void {
    form.get(control)?.enable();
  }

  saveFormControl(form: FormGroup, control: string): void {
    form.get(control)?.disable();
  }


  get(form: FormGroup, formControl: string): boolean {
    return !!(form.get(formControl)?.touched && form.get(formControl)?.invalid);
  }

  checkDisable(form: FormGroup, control: string): boolean {
    return !!form.get(control)?.disabled;

  }

  log(a: any) {
    console.log(a);
  }

}
