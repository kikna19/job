import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Country, CountryAllService} from "../../../../shared/services/country-all.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  country$: Observable<Country[]>;
  @Input() form: FormGroup;
  @ViewChild('d', {static: false}) d: ElementRef;
  f: string;

  constructor(
    private countryService: CountryAllService
  ) {
    this.country$ = this.countryService.getCountryCodes();

  }

  ngOnInit(): void {

  }

  img() {
    if (this.f)
      this.f = '';
    this.f = this.d.nativeElement.children[0].attributes[1].value;

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
