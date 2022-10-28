import {Action} from "@ngrx/store";
import {
  CodeValidationRequest,
  CodeValidationResponse,
  ExternalLogin,
  LoginResponse,
  NewPasswordResponse,
  PasswordResetActionRequest,
  PasswordResetResponse,
  SignUpResponse,
  signUpUser,
  UserState
} from "src/app/auth/models/user.state";

export enum AuthAction {
  LoginRequest = '[Auth] Login Request',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  SignUpRequest = '[Auth] sign Up Request',
  SignUpSuccess = '[Auth] sign Up Success',
  SignUpFailure = '[Auth] sign Up Failure',
  ExternalLoginRequest = '[Auth] External Login Request',
  PasswordResetRequest = '[Auth] Password Reset Request',
  PasswordResetSuccess = '[Auth] Password Reset Success',
  PasswordResetFailure = '[Auth] Password Reset Failure',
  CodeValidRequest = '[Auth] Code valid Request',
  CodeValidSuccess = '[Auth] Code valid Success',
  CodeValidFailure = '[Auth] Code valid  Failure',
  NewPasswordRequest = '[Auth] New password Request',
  NewPasswordSuccess = '[Auth] New password Success',
  NewPasswordFailure = '[Auth] New password  Failure',
  LogOut = '[Auth] Logout',
}


export class LoginRequest implements Action {
  readonly type = AuthAction.LoginRequest;

  constructor(public payload: UserState) {
  }
}

export class LoginSuccess implements Action {
  readonly type = AuthAction.LoginSuccess;

  constructor(public payload: LoginResponse) {
  }
}

export class LoginFailure implements Action {
  readonly type = AuthAction.LoginFailure;

  constructor(public payload: LoginResponse) {
  }
}


export class SignUpRequest implements Action {
  readonly type = AuthAction.SignUpRequest;

  constructor(public payload: signUpUser) {
  }
}


export class SignUpSuccess implements Action {
  readonly type = AuthAction.SignUpSuccess;

  constructor(public payload: SignUpResponse) {
  }
}

export class SignUpFailure implements Action {
  readonly type = AuthAction.SignUpFailure;

  constructor(public payload: SignUpResponse) {
  }
}

export class ExternalLoginRequest implements Action {
  readonly type = AuthAction.ExternalLoginRequest;

  constructor(public payload: ExternalLogin) {
  }
}

export class PasswordResetRequest implements Action {
  readonly type = AuthAction.PasswordResetRequest;

  constructor(public payload: PasswordResetActionRequest) {
  }
}

export class PasswordResetSuccess implements Action {
  readonly type = AuthAction.PasswordResetSuccess;

  constructor(public payload: PasswordResetResponse) {
  }
}

export class PasswordResetFailure implements Action {
  readonly type = AuthAction.PasswordResetFailure;

  constructor(public payload: PasswordResetResponse) {
  }
}

export class CodeValidRequest implements Action {
  readonly type = AuthAction.CodeValidRequest;

  constructor(public payload: CodeValidationRequest) {
  }
}

export class CodeValidSuccess implements Action {
  readonly type = AuthAction.CodeValidSuccess;

  constructor(public payload: CodeValidationResponse) {
  }
}

export class CodeValidFailure implements Action {
  readonly type = AuthAction.CodeValidFailure;

  constructor(public payload: CodeValidationResponse) {
  }
}

export class NewPasswordRequest implements Action {
  readonly type = AuthAction.NewPasswordRequest;

  constructor(public payload: UserState) {
  }
}


export class NewPasswordSuccess implements Action {
  readonly type = AuthAction.NewPasswordSuccess;

  constructor(public payload: NewPasswordResponse) {
  }
}


export class NewPasswordFailure implements Action {
  readonly type = AuthAction.NewPasswordFailure;

  constructor(public payload: NewPasswordResponse) {
  }
}


export class LogOut implements Action {
  readonly type = AuthAction.LogOut;

}


export type LoginRequestType
  = LoginRequest
  | LoginSuccess
  | LoginFailure
  | SignUpRequest
  | SignUpSuccess
  | SignUpFailure
  | ExternalLoginRequest
  | PasswordResetRequest
  | PasswordResetSuccess
  | PasswordResetFailure
  | CodeValidRequest
  | CodeValidSuccess
  | CodeValidFailure
  | NewPasswordRequest
  | NewPasswordSuccess
  | NewPasswordFailure
  | LogOut


// export const loginRequest = createAction(
//   '[Auth] Login Request',
//   props<{ credentials: { email: string; password: string } }>()
// );
//
// export const loginSuccess = createAction(
//   '[Auth] Login Success',
//   props<{ loginResponse: LoginResponse }>()
// );
//
// export const loginFailure = createAction(
//   '[Auth] Login Failure',
//   props<{ error: LoginResponse }>()
// );
//
// export const signUpRequest = createAction(
//   '[Auth] sign Up Request',
//   props<{ credentials: { firstName: string; lastName: string; phoneNumber: string; email: string; password: string; role: string } }>()
// );
//
// export const signUpSuccess = createAction(
//   '[Auth] sign Up Success',
//   props<{ signUpResponse: SignUpResponse }>()
// );
//
// export const signUpFailure = createAction(
//   '[Auth] sign Up Failure',
//   props<{ error: SignUpResponse }>()
// );
//
//
// export const externalLoginRequest = createAction(
//   '[Auth] External Login Request',
//   props<{
//     credentials: {
//       provider: string; id: string; authToken: string; email: string; firstName: string; lastName: string
//     }
//   }>()
// );
//
// export const passwordResetRequest = createAction(
//oginResponse.user,   '[Auth] Password Reset Request',
//   props<{ credentials: { email: string } }>()
// );
//
// export const passwordResetSuccess = createAction(
//   '[Auth] Password Reset Success',
//   props<{ passwordResetResponse: passwordResetResponse }>()
// );
//
// export const passwordResetFailure = createAction(
//   '[Auth] Password Reset Failure',
//   props<{ error: passwordResetResponse }>()
// );
//
//
// export const codeValidRequest = createAction(
//   '[Auth] Code valid Request',
//   props<{ credentials: { email: string, code: string } }>()
// );
//
// export const codeValidSuccess = createAction(
//   '[Auth] Code valid Success',
//   props<{ codeValidationResponse: codeValidationResponse }>()
// );
//
// export const codeValidFailure = createAction(
//   '[Auth] Code valid  Failure',
//   props<{ error: codeValidationResponse }>()
// );
//
// export const newPasswordRequest = createAction(
//   '[Auth] New password Request',
//   props<{ credentials: { email: string, password: string } }>()
// );
//
// export const newPasswordSuccess = createAction(
//   '[Auth] New password Success',
//   props<{ newPasswordResponse: newPasswordResponse }>()
// );
//
// export const newPasswordFailure = createAction(
//   '[Auth] New password  Failure',
//   props<{ error: newPasswordResponse }>()
// );
//
//
// export const logout = createAction('[Auth] Logout');
