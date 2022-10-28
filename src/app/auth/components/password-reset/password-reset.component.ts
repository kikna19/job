// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { Store } from '@ngrx/store';
// import { Subscription } from 'rxjs';
// import { AlertService } from 'src/app/alert/alert.service';
// import { selectPasswordResetError } from 'src/app/state/auth/auth.reducer';
// import * as AuthActions from '../../../state/auth/auth.actions';
//
// @Component({
//   selector: 'app-password-reset',
//   templateUrl: './password-reset.component.html',
//   styleUrls: ['./password-reset.component.scss']
// })
// export class PasswordResetComponent implements OnInit {
//
//   error$ = this.store.select(selectPasswordResetError);
//
//   subscription: Subscription;
//   public resetForm: FormGroup;
//
//   constructor(private fb: FormBuilder, private store: Store, private alert: AlertService) {
//     this.resetForm = this.fb.group({
//       email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
//     })
//   }
//
//   ngOnInit(): void {
//     this.subscription = this.error$.subscribe(message => {
//       this.alert.error(message!);
//     });
//   }
//
//   onSubmit() {
//     Object.keys(this.resetForm.controls).forEach(key => {
//       this.resetForm.controls[key].markAsDirty();
//     });
//     if (this.resetForm.valid) {
//       this.store.dispatch(AuthActions.passwordResetRequest({ credentials: { email: this.resetForm.value.email } }));
//       localStorage.setItem('email', this.resetForm.value.email);
//     }
//
//   }
//
//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//   }
// }
