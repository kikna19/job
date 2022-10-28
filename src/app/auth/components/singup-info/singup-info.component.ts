import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/alert/alert.service';
import { Subscription } from 'rxjs';
import {SignUpRequest} from "../../../state/auth/auth.actions";

@Component({
  selector: 'app-singup-info',
  templateUrl: './singup-info.component.html',
  styleUrls: ['./singup-info.component.scss']
})
export class SingupInfoComponent implements OnInit {
  error$ = this.store.select(state => state);
  public signupForm: FormGroup;
  subscription: Subscription;

  constructor(private store: Store, private fb: FormBuilder,private alert: AlertService) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [undefined, Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")]],
      repeatPassword: ['', Validators.required],
      cv: [undefined]
    })
  }

  ngOnInit(): void {
    this.subscription = this.error$.subscribe((message:any) => {
      this.alert.error(message!);
    });
  }

  async onSubmitUserDetails(): Promise<any> {
    console.log(this.signupForm.value);

    // Object.keys(this.signupForm.controls).forEach(key => {
    //   this.signupForm.controls[key].markAsDirty();
    // });
    // if (this.signupForm.valid) {
      this.store.dispatch(new SignUpRequest({
        firstName: '',
        lastName: '',
        password: '',
        repeatPassword: '',
        email: '',
        phoneNumber: '',
        cv: '',
      }));
    // }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
