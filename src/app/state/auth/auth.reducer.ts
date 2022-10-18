import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { User } from "src/app/auth/models/user";
import { codeValidFailure, codeValidRequest, codeValidSuccess, loginFailure, loginRequest, loginSuccess, logout, newPasswordFailure, newPasswordRequest, newPasswordSuccess, passwordResetFailure, passwordResetRequest, passwordResetSuccess, signUpFailure, signUpRequest, signUpSuccess } from './auth.actions';

export interface State {
  token: string;
  user: User;
  email: string,
  error: string | null;
}

export const initialState: State = {
  token: "",
  user: {} as User,
  email: "",
  error: null
};

const _authReducer = createReducer(
  initialState,
  on(loginRequest, (state: any,) => {
    return {
      ...state,
      error: null
    }
  }),
  on(loginSuccess, (state: any, { loginResponse }: any) => {
    const token = loginResponse.data.token;
    const refreshToken = loginResponse.data.refreshToken;
    localStorage.setItem("jwt", token);
    localStorage.setItem("refreshToken", refreshToken);
    return {
      ...state,
      token: loginResponse.data.token,
      user: loginResponse.user,
      error: null
    };
  }),
  on(loginFailure, (state: any, { error }: any) => {
    return {
      ...state,
      token: null,
      user: null,
      error: error
    };
  }),
  on(logout, (state: any) => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
    localStorage.clear();
    return {
      ...state,
      token: null,
      user: null,
    };
  }),

  on(signUpRequest, (state: any,) => {
    return {
      ...state,
      error: null
    }
  }),
  on(signUpSuccess, (state: any, { signUpResponse }: any) => {
    return {
      ...state,
      token: signUpResponse.data.token,
      user: signUpResponse.user,
      error: null
    };
  }),
  on(signUpFailure, (state: any, { error }: any) => {
    return {
      ...state,
      token: null,
      user: null,
      error: error
    };
  }),


  on(passwordResetRequest, (state: any, { credentials }: any) => {
    return {
      ...state,
      email: credentials.email,
      error: null
    }
  }),
  on(passwordResetSuccess, (state: any, { passwordResetResponse }: any) => {
    return {
      ...state,
      error: null
    };
  }),
  on(passwordResetFailure, (state: any, { error }: any) => {
    return {
      ...state,
      error: error
    };
  }),
  on(codeValidRequest, (state: any,) => {
    return {
      ...state,
      error: null
    }
  }),
  on(codeValidSuccess, (state: any, { codeValidationResponse }: any) => {
    return {
      ...state,
      error: null
    };
  }),
  on(codeValidFailure, (state: any, { error }: any) => {
    return {
      ...state,
      error: error
    };
  }),

  on(newPasswordRequest, (state: any,) => {
    return {
      ...state,
      error: null
    }
  }),
  on(newPasswordSuccess, (state: any, { newPasswordResponse }: any) => {
    localStorage.removeItem("email");
    return {
      ...state,
      error: null,
    };
  }),
  on(newPasswordFailure, (state: any, { error }: any) => {
    return {
      ...state,
      error: error
    };
  }),
);

export function authReducer(state: State | undefined, action: Action) {
  return _authReducer(state, action);
}

export const selectAuthState = createFeatureSelector<State>('auth');

export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);
export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);
export const selectSignUpError = createSelector(
  selectAuthState,
  (state) => state.error
);

export const selectLoginError = createSelector(
  selectAuthState,
  (state) => state.error
);
export const selectUserEmail = createSelector(
  selectAuthState,
  (state) => state.email
);
export const selectPasswordResetError = createSelector(
  selectAuthState,
  (state) => state.error
);

export const selectPasswordCodeValidationError = createSelector(
  selectAuthState,
  (state) => state.error
);
