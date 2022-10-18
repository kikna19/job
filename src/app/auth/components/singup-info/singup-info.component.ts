import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { signUpUser } from '../../models/user';
import * as AuthActions from '../../../state/auth/auth.actions';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { selectSignUpError } from 'src/app/state/auth/auth.reducer';
import { AlertService } from 'src/app/alert/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-singup-info',
  templateUrl: './singup-info.component.html',
  styleUrls: ['./singup-info.component.scss']
})
export class SingupInfoComponent implements OnInit {
  error$ = this.store.select(selectSignUpError);
  public signupForm: FormGroup;
  subscription: Subscription;
  
  constructor(private store: Store, private fb: FormBuilder,private alert: AlertService) { 
    this.signupForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phoneNumber: new FormControl(),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")]),
      repeatPassword: new FormControl('', Validators.required),
      role: new FormControl(),
    })
  }

  ngOnInit(): void {
    this.subscription = this.error$.subscribe(message => {
      this.alert.error(message!);
    });
  }

  async onSubmitUserDetails(): Promise<any> {

    Object.keys(this.signupForm.controls).forEach(key => {
      this.signupForm.controls[key].markAsDirty();
    });
    if (this.signupForm.valid) {
      this.store.dispatch(AuthActions.signUpRequest({ credentials: this.signupForm.value }));
    }
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
