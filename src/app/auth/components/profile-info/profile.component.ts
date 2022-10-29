import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent{
  user: any;
  form: FormArray;
  personalForm: FormGroup;
  experienceForm: FormGroup;
  situationForm: FormGroup;
  cvForm: FormGroup;
  ecvFrom: FormGroup;
  education: FormArray;
  educationForm: FormGroup;


  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.array([
      this.personalForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', Validators.required],
        country: ['', Validators.required],
        password: ['********', Validators.required],
        email: ['', Validators.required],
        city: ['', Validators.required],
      }),
      this.experienceForm = this.fb.group({
        occupation: ['', Validators.required],
        stack: ['', Validators.required],
        experience: ['', Validators.required],
      }),
      this.situationForm = this.fb.group({
        hiredOne: ['', Validators.required],
        hiredTwo: ['', Validators.required],
        company: ['', Validators.required],
        salary: ['', Validators.required],
        bonusOne: ['', Validators.required],
        bonusTwo: ['', Validators.required],
        bonus: ['', Validators.required],
      }),
      this.cvForm = this.fb.group({
        cv: ['', Validators.required],
      }),
      this.ecvFrom = this.fb.group({
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






}
