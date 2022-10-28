import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, of, switchMap, tap} from 'rxjs';
import {AuthService} from 'src/app/auth/services/auth.service';
import {AuthAction, LoginFailure, LoginSuccess, SignUpFailure, SignUpSuccess} from "./auth.actions";

@Injectable()
export class AuthEffects {

  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.LoginRequest),
      switchMap((action) =>
        this.authService
          .logIn('', '')
          .pipe(
            map(loginResponse => {
              if (loginResponse) {
                return new LoginSuccess(loginResponse)  //({ loginResponse })
              }
              return new LoginFailure(loginResponse) //({ error: loginResponse.errors?.message})
            }),
            catchError((err) => of(new LoginFailure(err)))
          )
      ))
  )
  // externalLoginRequest$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthAction.externalLoginRequest),
  //     mergeMap((action) =>
  //       this.authService
  //         .externalLogIn(action.credentials)
  //         .pipe(
  //           map((loginResponse) => {
  //             if (loginResponse.success) {
  //               return AuthAction.loginSuccess({ loginResponse })
  //             } else {
  //               return AuthAction.loginFailure({ error: loginResponse.errors[0].message })
  //             }
  //           }
  //           ),
  //           catchError((loginResponse) => of(AuthAction.loginFailure({ error: loginResponse.errors[0].message })))
  //         )
  //     )
  //   )
  // );
  //
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthAction.LoginSuccess),
        tap((loginResponse) => {
          alert('success')
        })
      ),
    {dispatch: false}
  );
  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthAction.LoginFailure),
        tap((loginResponse) => {
          console.log(loginResponse);
        })
      ),
    {dispatch: false}
  );

  signUpRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.SignUpRequest),
      mergeMap((action: any) =>
        this.authService
          .signUp(
            action.firstName,
            action.lastName,
            action.phoneNumber,
            action.email,
            action.password,
          )
          .pipe(
            map((signUpResponse) => {
                if (signUpResponse) {
                  return new SignUpSuccess(signUpResponse)
                }
                return new SignUpFailure(signUpResponse)
              }
            ),
            catchError((signUpResponse) => of(new SignUpFailure(signUpResponse)))
          )
      )
    )
  )

  signUpSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthAction.SignUpSuccess),
        tap((signUpResponse) => {
          alert('sign up success')
          // this.router.navigateByUrl('/');
          // this.router.navigateByUrl('/auth/signup-status');
        })
      ),
    {dispatch: false}
  );

  signUpFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthAction.SignUpFailure),
        tap((signUpResponse) => {
          console.log(signUpResponse);
          // this.router.navigateByUrl('/');
          // this.router.navigateByUrl('/auth/signup-status');
        })
      ),
    {dispatch: false}
  );

  // passwordResetRequest$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthAction.passwordResetRequest),
  //     mergeMap((action) =>
  //       this.authService
  //         .resetPassword(action.credentials.email)
  //         .pipe(
  //           map((passwordResetResponse) => {
  //             if (passwordResetResponse.success) {
  //               return AuthAction.passwordResetSuccess({ passwordResetResponse })
  //             }
  //             return AuthAction.passwordResetFailure({ error: passwordResetResponse.errors[0].message })
  //           }
  //           ),
  //           catchError((passwordResetResponse) => of(AuthActions.passwordResetFailure({ error: passwordResetResponse.errors[0].message })))
  //         )
  //     )
  //   )
  // );
  //
  // passwordResetSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(AuthActions.passwordResetSuccess),
  //       tap(({ passwordResetResponse }) => {
  //        this.router.navigateByUrl('auth/verification-code');
  //       })
  //     ),
  //   { dispatch: false }
  // );
  //
  // codeValidRequest$ = createEffect(() =>
  // this.actions$.pipe(
  //   ofType(AuthActions.codeValidRequest),
  //   mergeMap((action) =>
  //     this.authService
  //       .checkCodeValidation(action.credentials.email, action.credentials.code)
  //       .pipe(
  //         map((codeValidationResponse) => {
  //           if (codeValidationResponse.success) {
  //             return AuthActions.codeValidSuccess({ codeValidationResponse })
  //           }
  //           return AuthActions.codeValidFailure({ error: codeValidationResponse.errors[0].message })
  //         }
  //         ),
  //         catchError((codeValidationResponse) => of(AuthActions.codeValidFailure({ error: codeValidationResponse.errors[0].message })))
  //       )
  //   )
  // )
// );
//
// codeValidSuccess$ = createEffect(
//   () =>
//     this.actions$.pipe(
//       ofType(AuthActions.codeValidSuccess),
//       tap(({ codeValidationResponse }) => {
//        this.router.navigateByUrl('auth/new-password');
//       })
//     ),
//   { dispatch: false }
// );
//
//
// newPasswordRequest$ = createEffect(() =>
//   this.actions$.pipe(
//     ofType(AuthActions.newPasswordRequest),
//     mergeMap((action) =>
//       this.authService
//         .setNewPassword(action.credentials.email, action.credentials.password)
//         .pipe(
//           map((newPasswordResponse) => {
//             if (newPasswordResponse.success) {
//               return AuthActions.newPasswordSuccess({ newPasswordResponse })
//             }
//             return AuthActions.newPasswordFailure({ error: newPasswordResponse.errors[0].message })
//           }
//           ),
//           catchError((newPasswordResponse) => of(AuthActions.newPasswordFailure({ error: newPasswordResponse.errors[0].message })))
//         )
//     )
//   )
// );
//
// newPasswordSuccess$ = createEffect(
//   () =>
//     this.actions$.pipe(
//       ofType(AuthActions.newPasswordSuccess),
//       tap(({ newPasswordResponse }) => {
//        this.router.navigateByUrl('/auth/login');
//       })
//     ),
//   { dispatch: false }
// );
//
// logout$ = createEffect(
//   () =>
//     this.actions$.pipe(
//       ofType(AuthActions.logout),
//       tap(({ }) => {
//        this.router.navigateByUrl('/auth/login');
//       })
//     ),
//   { dispatch: false }
// );
//

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {
  }
}

