import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form: FormArray;
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  fourthForm: FormGroup;
  fifthForm: FormGroup;
  education: FormArray;
  educationForm: FormGroup;
  hiredOne: boolean = false;
  hiredTwo: boolean = false;
  bonusOne: boolean = false;
  bonusTwo: boolean = false;
  endDateOne: boolean = false;
  endDateTwo: boolean = false;
  @ViewChild('file', {static: false}) file!: ElementRef<HTMLInputElement>

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.array([
      this.firstForm = this.fb.group({
        firstName: ['', Validators.required],
        surName: ['', Validators.required],
        phone: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', Validators.required],
        city: ['', Validators.required],
      }),
      this.secondForm = this.fb.group({
        occupation: ['', Validators.required],
        stack: ['', Validators.required],
        experience: ['', Validators.required],
      }),
      this.thirdForm = this.fb.group({
        hiredOne: ['', Validators.required],
        hiredTwo: ['', Validators.required],
        company: ['', Validators.required],
        salary: ['', Validators.required],
        bonusOne: ['', Validators.required],
        bonusTwo: ['', Validators.required],
        bonus: ['', Validators.required],
      }),
      this.fourthForm = this.fb.group({
        cv: ['', Validators.required],
      }),
      this.fifthForm = this.fb.group({
        intro: ['', Validators.required],
        language: ['', Validators.required],
        education: this.fb.array([
          this.educationForm = this.fb.group({
            school: ['', Validators.required],
            study: ['', Validators.required],
            startMonth: [undefined, Validators.required],
            startYear: [undefined, Validators.required],
            endOne: ['', Validators.required],
            endTwo: ['', Validators.required],
            endMonth: [undefined, Validators.required],
            endYear: [undefined, Validators.required],
          })
        ])
      })
    ]);
  }

  ngOnInit(): void {
    console.log(this.eduForm.get('endOne'));
  }

  educations(): any[] {
    return (<FormArray>this.fifthForm.get('education')).controls;
  }

  get(form: FormGroup, formControl: string): boolean {
    return !!(form.get(formControl)?.touched && form.get(formControl)?.invalid);
  }

  onChange(): void {
    console.log(this.file.nativeElement.value);
  }

  checkHiredOne(): void {
    if (this.hiredTwo)
      this.hiredTwo = false
    this.hiredOne = !this.hiredOne;
    this.thirdForm.get('hiredOne')?.setValue('Yes, I am');
    this.thirdForm.get('hiredTwo')?.disable();
    this.thirdForm.get('hiredTwo')?.setValue('');
    this.thirdForm.get('company')?.enable()
    this.thirdForm.get('salary')?.enable();
  }

  checkHiredTwo(): void {

    if (this.hiredOne)
      this.hiredOne = false
    this.hiredTwo = !this.hiredTwo;
    this.thirdForm.get('hiredTwo')?.setValue('Not now');
    this.thirdForm.get('hiredTwo')?.enable();
    this.thirdForm.get('hiredOne')?.disable();
    this.thirdForm.get('hiredOne')?.setValue('');
    this.thirdForm.get('company')?.disable();
    this.thirdForm.get('salary')?.disable();
    this.thirdForm.get('company')?.setValue('');
    this.thirdForm.get('salary')?.setValue('');
  }

  checkBonusOne(): void {
    if (this.bonusTwo)
      this.bonusTwo = false
    this.bonusOne = !this.bonusOne;
    this.thirdForm.get('bonusOne')?.setValue('Yes');
    this.thirdForm.get('bonusOne')?.enable();
    this.thirdForm.get('bonusTwo')?.disable();
    this.thirdForm.get('bonus')?.enable();
  }

  checkBonusTwo(): void {
    if (this.bonusOne)
      this.bonusOne = false
    this.bonusTwo = !this.bonusTwo;
    this.thirdForm.get('bonusTwo')?.setValue('No');
    this.thirdForm.get('bonusOne')?.disable();
    this.thirdForm.get('bonusOne')?.setValue('');
    this.thirdForm.get('bonus')?.disable();
    this.thirdForm.get('bonus')?.setValue('');
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
  }

  log(): void {
    console.log(this.educationArray);
  }

  get educationArray(): FormArray {
    return this.fifthForm.controls['education'] as FormArray;
  }

  get eduForm(): FormGroup {
    return (<FormGroup>this.educationArray.controls.slice(-1)[0])
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
    this.educationArray.push(newEducation);
  }


}
