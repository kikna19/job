import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-current-situation',
  templateUrl: './current-situation.component.html',
  styleUrls: ['./current-situation.component.scss']
})
export class CurrentSituationComponent implements OnInit {

  @Input() form: FormGroup;
  hiredOne: boolean = false;
  hiredTwo: boolean = false;
  bonusOne: boolean = false;
  bonusTwo: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.form.get('company')?.disable();
    this.form.get('salary')?.disable();
    this.form.get('bonus')?.disable();
  }


  get(form: FormGroup, formControl: string): boolean {
    return !!(form.get(formControl)?.touched && form.get(formControl)?.invalid);
  }

  checkHiredOne(): void {
    if (this.hiredTwo)
      this.hiredTwo = false
    this.hiredOne = true;
    this.form.get('hiredOne')?.setValue('Yes, I am');
    this.form.get('hiredTwo')?.setValue('');
    this.form.get('hiredOne')?.disable();
    this.form.get('hiredTwo')?.disable();
    this.form.get('company')?.enable()
    this.form.get('salary')?.enable();
  }

  checkHiredTwo(): void {
    if (this.hiredOne)
      this.hiredOne = false
    this.hiredTwo = true;
    this.form.get('hiredTwo')?.setValue('Not now');
    this.form.get('hiredOne')?.setValue('');
    this.form.get('hiredOne')?.disable();
    this.form.get('hiredTwo')?.disable();
    this.form.get('company')?.setValue('');
    this.form.get('salary')?.setValue('');
    this.form.get('company')?.disable()
    this.form.get('salary')?.disable();
  }

  checkBonusOne(): void {
    if (this.bonusTwo)
      this.bonusTwo = false
    this.bonusOne = true;
    this.form.get('bonusOne')?.setValue('Yes');
    this.form.get('bonusOne')?.disable();
    this.form.get('bonusTwo')?.disable();
    this.form.get('bonus')?.enable();
  }

  checkBonusTwo(): void {
    if (this.bonusOne)
      this.bonusOne = false
    this.bonusTwo = true;
    this.form.get('bonusTwo')?.setValue('No');
    this.form.get('bonusOne')?.setValue('');
    this.form.get('bonusOne')?.disable();
    this.form.get('bonusTwo')?.disable();
    this.form.get('bonus')?.disable();
    this.form.get('bonus')?.setValue('');
  }

  updateFormControlValue(elementId: any): void {
    elementId.classList.remove('border-r', 'rounded-br-md', 'rounded-tr-md');
  }


  checkDisable(form: FormGroup, control: string): boolean {
    return !!form.get(control)?.disabled;
  }

  editFormControl(form: FormGroup, control: string): void {
    form.get(control)?.enable();
  }


  saveFormControl(form: FormGroup, control: string): void {
    form.get(control)?.disable();
  }


}
