import { createAction, props } from "@ngrx/store";
import { codeValidationResponse, LoginResponse, newPasswordResponse, passwordResetResponse, SignUpResponse } from "src/app/auth/models/user";

export const loginRequest = createAction(
  '[Auth] Login Request',
  props<{ credentials: { email: string; password: string } }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ loginResponse: LoginResponse }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: LoginResponse }>()
);

export const signUpRequest = createAction(
  '[Auth] sign Up Request',
  props<{ credentials: { firstName: string; lastName: string; phoneNumber: string; email: string; password: string; role: string } }>()
);

export const signUpSuccess = createAction(
  '[Auth] sign Up Success',
  props<{ signUpResponse: SignUpResponse }>()
);

export const signUpFailure = createAction(
  '[Auth] sign Up Failure',
  props<{ error: SignUpResponse }>()
);


export const externalLoginRequest = createAction(
  '[Auth] External Login Request',
  props<{
    credentials: {
      provider: string; id: string; authToken: string; email: string; firstName: string; lastName:string
    }
  }>()
);

export const passwordResetRequest = createAction(
  '[Auth] Password Reset Request',
  props<{ credentials: { email: string} }>()
);

export const passwordResetSuccess = createAction(
  '[Auth] Password Reset Success',
  props<{ passwordResetResponse: passwordResetResponse }>()
);

export const passwordResetFailure = createAction(
  '[Auth] Password Reset Failure',
  props<{ error: passwordResetResponse }>()
);


export const codeValidRequest = createAction(
  '[Auth] Code valid Request',
  props<{ credentials: { email:string,code: string } }>()
);

export const codeValidSuccess = createAction(
  '[Auth] Code valid Success',
  props<{ codeValidationResponse: codeValidationResponse }>()
);

export const codeValidFailure = createAction(
  '[Auth] Code valid  Failure',
  props<{ error: codeValidationResponse }>()
);

export const newPasswordRequest = createAction(
  '[Auth] New password Request',
  props<{ credentials: { email: string, password: string } }>()
);

export const newPasswordSuccess = createAction(
  '[Auth] New password Success',
  props<{ newPasswordResponse: newPasswordResponse }>()
);

export const newPasswordFailure = createAction(
  '[Auth] New password  Failure',
  props<{ error: newPasswordResponse }>()
);


export const logout = createAction('[Auth] Logout');
