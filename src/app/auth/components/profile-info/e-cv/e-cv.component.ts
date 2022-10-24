import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-e-cv',
  templateUrl: './e-cv.component.html',
  styleUrls: ['./e-cv.component.scss']
})
export class ECvComponent implements OnInit {

  @Input() form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
  }

  educations(): any[] {
    return (<FormArray>this.form.get('education')).controls;
  }

  get educationArray(): FormArray {
    return this.form.controls['education'] as FormArray;
  }

  get eduForm(): FormGroup {
    return (<FormGroup>this.educationArray.controls.slice(-1)[0])
  }

  get(form: FormGroup, formControl: string): boolean {
    return !!(form.get(formControl)?.touched && form.get(formControl)?.invalid);
  }


  checkEndDateOne(): void {
    this.eduForm.get('endOne')?.enable();
    this.eduForm.get('endOne')?.setValue('Finished');
    this.eduForm.get('endTwo')?.disable();
    this.eduForm.get('endTwo')?.setValue('');
    this.eduForm.get('endMonth')?.enable();
    this.eduForm.get('endYear')?.enable();
  }

  checkEndDateTwo(): void {
    this.eduForm.get('endTwo')?.enable();
    this.eduForm.get('endTwo')?.setValue('Not yet');
    this.eduForm.get('endOne')?.disable();
    this.eduForm.get('endOne')?.setValue('');
    this.eduForm.get('endMonth')?.disable();
    this.eduForm.get('endMonth')?.setValue('');
    this.eduForm.get('endYear')?.disable();
    this.eduForm.get('endYear')?.setValue('');
    console.log(this.eduForm.value);
  }

  addMoreEducation(): void {
    const newEducation = this.fb.group({
      school: new FormControl('', Validators.required),
      study: new FormControl('', Validators.required),
      startMonth: new FormControl(undefined, Validators.required),
      startYear: new FormControl(undefined, Validators.required),
      endOne: new FormControl('', Validators.required),
      endTwo: new FormControl('', Validators.required),
      endMonth: new FormControl(undefined, Validators.required),
      endYear: new FormControl(undefined, Validators.required),
    });
    if (this.eduForm.valid) {
      this.educationArray.push(newEducation);
    }

  }

  cancelEduForm(index: number): void {
    this.educationArray.controls.splice(index, 1)
  }

  log(){
    console.log(this.form.value);
  }

}
