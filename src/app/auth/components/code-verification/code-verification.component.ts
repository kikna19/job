import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/alert/alert.service';
import { selectPasswordCodeValidationError, selectUserEmail } from 'src/app/state/auth/auth.reducer';
import * as AuthActions from '../../../state/auth/auth.actions';

@Component({
  selector: 'app-code-verification',
  templateUrl: './code-verification.component.html',
  styleUrls: ['./code-verification.component.scss']
})
export class CodeVerificationComponent implements OnInit {
  public codeForm: FormGroup;

  error$ = this.store.select(selectPasswordCodeValidationError);
  subscription: Subscription;
 
  email: string;
  constructor(private fb: FormBuilder,private store: Store, private alert: AlertService) { 
    this.codeForm = this.fb.group({
      code: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    })
  }

  ngOnInit(): void {
    this.subscription = this.error$.subscribe(message => {
      this.alert.error(message!);
    });
  }

  onSubmit() {
    Object.keys(this.codeForm.controls).forEach(key => {
      this.codeForm.controls[key].markAsDirty();
    });
    if (this.codeForm.valid) {
      this.store.dispatch(AuthActions.codeValidRequest({ credentials: { email:localStorage.getItem("email")!.toString(), code: this.codeForm.value.code } }));
    }
  }
  resendCode(){
    this.store.dispatch(AuthActions.passwordResetRequest({ credentials: { email: localStorage.getItem("email")!.toString() } }));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
