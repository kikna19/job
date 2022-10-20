import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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


  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.array([
      this.firstForm = this.fb.group({
        firstName: ['s', Validators.required],
        surName: ['doe', Validators.required],
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
    this.disableInput(this.firstForm, ['firstName', 'surName', 'phone', 'password', 'email', 'city']);
    this.getControls(this.firstForm)
  }

  disableInput(form: FormGroup, controls: string[]): void {
    controls.forEach(c => {
      if (form.get(c)?.value)
        form.get(c)?.disable();
    });
  }

  getControls(form: FormGroup){
    console.log(form.controls);
  }







}
