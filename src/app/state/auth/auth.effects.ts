import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, map, tap, mergeMap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      mergeMap((action) =>
        this.authService
          .logIn(action.credentials.email, action.credentials.password)
          .pipe(
            map((loginResponse) => {
              if (loginResponse.success) {               
                return AuthActions.loginSuccess({ loginResponse })
              }
              return AuthActions.loginFailure({ error: loginResponse.errors[0].message})
            }
            ),
            catchError((loginResponse) => of(AuthActions.loginFailure({ error: loginResponse.errors[0].message })))
          )
      )
    )
  );

  externalLoginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.externalLoginRequest),
      mergeMap((action) =>
        this.authService
          .externalLogIn(action.credentials)
          .pipe(
            map((loginResponse) => {
              if (loginResponse.success) {
                return AuthActions.loginSuccess({ loginResponse })
              } else {
                return AuthActions.loginFailure({ error: loginResponse.errors[0].message })
              }
            }
            ),
            catchError((loginResponse) => of(AuthActions.loginFailure({ error: loginResponse.errors[0].message })))
          )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ loginResponse }) => {
         this.router.navigateByUrl('/');      
        
        })
      ),
    { dispatch: false }
  );

  signUpRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUpRequest),
      mergeMap((action) =>
        this.authService
          .signUp(action.credentials.firstName, action.credentials.lastName, action.credentials.phoneNumber, action.credentials.email, action.credentials.password, action.credentials.role)
          .pipe(
            map((signUpResponse) => {
              if (signUpResponse.success) {
                return AuthActions.signUpSuccess({ signUpResponse })
              }
              return AuthActions.signUpFailure({ error: signUpResponse.errors[0].message })
            }
            ),
            catchError((signUpResponse) => of(AuthActions.signUpFailure({ error: signUpResponse.errors[0].message })))
          )
      )
    )
  );

  signUpSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signUpSuccess),
        tap(({ signUpResponse }) => {
          this.router.navigateByUrl('/');      
         // this.router.navigateByUrl('/auth/signup-status');
        })
      ),
    { dispatch: false }
  );

  passwordResetRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.passwordResetRequest),
      mergeMap((action) =>
        this.authService
          .resetPassword(action.credentials.email)
          .pipe(
            map((passwordResetResponse) => {
              if (passwordResetResponse.success) {
                return AuthActions.passwordResetSuccess({ passwordResetResponse })
              }
              return AuthActions.passwordResetFailure({ error: passwordResetResponse.errors[0].message })
            }
            ),
            catchError((passwordResetResponse) => of(AuthActions.passwordResetFailure({ error: passwordResetResponse.errors[0].message })))
          )
      )
    )
  );

  passwordResetSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.passwordResetSuccess),
        tap(({ passwordResetResponse }) => {
         this.router.navigateByUrl('auth/verification-code');      
        })
      ),
    { dispatch: false }
  );

  codeValidRequest$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.codeValidRequest),
    mergeMap((action) =>
      this.authService
        .checkCodeValidation(action.credentials.email, action.credentials.code)
        .pipe(
          map((codeValidationResponse) => {
            if (codeValidationResponse.success) {
              return AuthActions.codeValidSuccess({ codeValidationResponse })
            }
            return AuthActions.codeValidFailure({ error: codeValidationResponse.errors[0].message })
          }
          ),
          catchError((codeValidationResponse) => of(AuthActions.codeValidFailure({ error: codeValidationResponse.errors[0].message })))
        )
    )
  )
);

codeValidSuccess$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(AuthActions.codeValidSuccess),
      tap(({ codeValidationResponse }) => {
       this.router.navigateByUrl('auth/new-password');      
      })
    ),
  { dispatch: false }
);


newPasswordRequest$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.newPasswordRequest),
    mergeMap((action) =>
      this.authService
        .setNewPassword(action.credentials.email, action.credentials.password)
        .pipe(
          map((newPasswordResponse) => {
            if (newPasswordResponse.success) {
              return AuthActions.newPasswordSuccess({ newPasswordResponse })
            }
            return AuthActions.newPasswordFailure({ error: newPasswordResponse.errors[0].message })
          }
          ),
          catchError((newPasswordResponse) => of(AuthActions.newPasswordFailure({ error: newPasswordResponse.errors[0].message })))
        )
    )
  )
);

newPasswordSuccess$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(AuthActions.newPasswordSuccess),
      tap(({ newPasswordResponse }) => {
       this.router.navigateByUrl('/auth/login'); 
      })
    ),
  { dispatch: false }
);

logout$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(({ }) => {      
       this.router.navigateByUrl('/auth/login');   
      })
    ),
  { dispatch: false }
);


  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) { }
}