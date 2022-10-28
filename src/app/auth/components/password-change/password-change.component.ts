// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { Store } from '@ngrx/store';
// import { Subscription } from 'rxjs';
// import { AlertService } from 'src/app/alert/alert.service';
// import * as AuthActions from '../../../state/auth/auth.actions';
//
// @Component({
//   selector: 'app-password-change',
//   templateUrl: './password-change.component.html',
//   styleUrls: ['./password-change.component.scss']
// })
// export class PasswordChangeComponent implements OnInit {
//
//   subscription: Subscription;
//
//   public changePasswordForm: FormGroup;
//   constructor(private store: Store, private fb: FormBuilder, private alert: AlertService) {
//     this.changePasswordForm = this.fb.group({
//       password: new FormControl('', [Validators.required]),
//       confirmpassword: new FormControl('', [Validators.required]),
//     })
//   }
//
//   ngOnInit(): void {
//   }
//
//   async onSubmit(): Promise<any> {
//
//     Object.keys(this.changePasswordForm.controls).forEach(key => {
//       this.changePasswordForm.controls[key].markAsDirty();
//     });
//     if (this.changePasswordForm.valid) {
//       this.store.dispatch(AuthActions.newPasswordRequest({ credentials: { email: localStorage.getItem("email")!.toString() , password: this.changePasswordForm.value.password } }));
//     }
//   }
//
// }
