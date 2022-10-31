import { Component, OnInit } from '@angular/core';
import { UserState } from '../../models/user.state';
import * as AuthActions from '../../../state/auth/auth.actions';
import { select, State, Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/alert/alert.service';
import { Observable, Subscription } from 'rxjs';
import {LoginRequest} from "../../../state/auth/auth.actions";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // error$ = this.store.select(selectLoginError);
  user: Observable<any>

  subscription: Subscription;
  public loginForm: FormGroup;

  constructor(private store: Store, private fb: FormBuilder, private alert: AlertService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    // this.subscription = this.error$.subscribe(message => {
    //   this.alert.error(message!);
    // });
    this.user = this.store.select(state =>state)
  }

  async onSubmit(): Promise<any> {
    this.store.dispatch(new LoginRequest({
      email: 'kiknadzevazha@gmail.com',
      password:'asdfas1234',
    }))
    // Object.keys(this.loginForm.controls).forEach(key => {
    //   this.loginForm.controls[key].markAsDirty();
    // });
    // if (this.loginForm.valid) {
    //   this.store.dispatch(new LoginRequest({
    //     email: this.loginForm.value.email,
    //     password: this.loginForm.value.password
    //   }))
    // }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
