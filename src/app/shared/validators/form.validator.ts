import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

export class FormValidator extends Validators {

  static passwordNoMatch: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    if (group.get('password')?.value === group.get('repeatPassword')?.value)
      return null;
    else return {passwordNoMatch: true}
  }

}
