import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import * as AuthActions from '../../../state/auth/auth.actions';
import { select, State, Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { selectAuthState, selectLoginError } from 'src/app/state/auth/auth.reducer';
import { AlertService } from 'src/app/alert/alert.service';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error$ = this.store.select(selectLoginError);

  subscription: Subscription;
  public loginForm: FormGroup;

  constructor(private store: Store, private fb: FormBuilder, private alert: AlertService) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.subscription = this.error$.subscribe(message => {
      this.alert.error(message!);
    });
  }

  async onSubmit(): Promise<any> {

    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.controls[key].markAsDirty();
    });
    if (this.loginForm.valid) {
      this.store.dispatch(AuthActions.loginRequest({ credentials: this.loginForm.value }));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
