import {UserState} from "src/app/auth/models/user.state";
import {AuthAction, LoginRequestType} from "./auth.actions";

export interface State {
  token?: string;
  user: any
  error?: string | null;
}

export const initialState: State = {
  token: "",
  user: {} as UserState,
  error: null
};


export const reducer = (
  state: UserState,
  action: LoginRequestType) => {
  switch (action.type) {
    case AuthAction.LoginRequest: {
      return {
        ...state,
        user: null,
        error: null,
        isLoading: true,
        isLoaded: false
      }
    }

    case AuthAction.LoginSuccess: {
      const token = action.payload.token;
      const refreshToken = action.payload.refreshToken;
      localStorage.setItem("jwt", token);
      localStorage.setItem("refreshToken", refreshToken);
      return {
        ...state,
        token: token,
        user: action.payload,
        error: null
      };
    }

    case AuthAction.LoginFailure: {
      return {
        ...state,
        error: action.payload.errors
      };
    }

    case AuthAction.LogOut: {
      localStorage.removeItem("jwt");
      localStorage.removeItem("refreshToken");
      localStorage.clear();
      return {
        ...state,
        token: null,
        user: null
      };
    }
    case AuthAction.SignUpRequest: {
      return {
        ...state,
        error: null
      };
    }
    case AuthAction.SignUpSuccess: {
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        error: null
      };
    }
    case AuthAction.SignUpFailure: {
      return {
        ...state,
        token: null,
        user: null,
        error: action.payload.errors,
      };
    }
    case AuthAction.PasswordResetRequest: {
      return {
        ...state,
        email: action.payload.email,
        error: null,
      };
    }
    case AuthAction.PasswordResetSuccess: {
      return {
        ...state,
        error: null,
      };
    }
    case AuthAction.PasswordResetFailure: {
      return {
        ...state,
        error: action.payload.errors,
      };
    }
    case AuthAction.CodeValidRequest: {
      return {
        ...state,
        error: null,
      };
    }
    case AuthAction.CodeValidSuccess: {
      return {
        ...state,
        error: null,
      };
    }
    case AuthAction.CodeValidFailure: {
      return {
        ...state,
        error: action.payload.errors
      };
    }
    case AuthAction.NewPasswordRequest: {
      return {
        ...state,
        error: null,
      };
    }
    case AuthAction.NewPasswordSuccess: {
      return {
        ...state,
        error: null,
      };
    }
    case AuthAction.NewPasswordFailure: {
      return {
        ...state,
        error: action.payload.errors,
      };
    }

    default: {
      return state
    }
  }
}

// export function getInitialState(): State {
//   return initialState
// }

//
// const _authReducer = createReducer(
//   initialState,
//
//
//   on(loginRequest, (state: any) => {
//     return {
//       ...state,
//       error: null
//     }
//   }),
//
//
//   on(loginSuccess, (state: any, {loginResponse}: any) => {
//     const token = loginResponse.data.token;
//     const refreshToken = loginResponse.data.refreshToken;
//     localStorage.setItem("jwt", token);
//     localStorage.setItem("refreshToken", refreshToken);
//     return {
//       ...state,
//       token: loginResponse.data.token,
//       user: loginResponse.user,
//       error: null
//     };
//   }),
//   on(loginFailure, (state: any, {error}: any) => {
//     return {
//       ...state,
//       token: null,
//       user: null,
//       error: error
//     };
//   }),
//   on(logout, (state: any) => {
//     localStorage.removeItem("jwt");
//     localStorage.removeItem("refreshToken");
//     localStorage.clear();
//     return {
//       ...state,
//       token: null,
//       user: null,
//     };
//   }),
//
//   on(signUpRequest, (state: any,) => {
//     return {
//       ...state,
//       error: null
//     }
//   }),
//   on(signUpSuccess, (state: any, {signUpResponse}: any) => {
//     return {
//       ...state,
//       token: signUpResponse.data.token,
//       user: signUpResponse.user,
//       error: null
//     };
//   }),
//   on(signUpFailure, (state: any, {error}: any) => {
//     return {
//       ...state,
//       token: null,
//       user: null,
//       error: error
//     };
//   }),
//
//
//   on(passwordResetRequest, (state: any, {credentials}: any) => {
//     return {
//       ...state,
//       email: credentials.email,
//       error: null
//     }
//   }),
//   on(passwordResetSuccess, (state: any, {passwordResetResponse}: any) => {
//     return {
//       ...state,
//       error: null
//     };
//   }),
//   on(passwordResetFailure, (state: any, {error}: any) => {
//     return {
//       ...state,
//       error: error
//     };
//   }),
//   on(codeValidRequest, (state: any,) => {
//     return {
//       ...state,
//       error: null
//     }
//   }),
//   on(codeValidSuccess, (state: any, {codeValidationResponse}: any) => {
//     return {
//       ...state,
//       error: null
//     };
//   }),
//   on(codeValidFailure, (state: any, {error}: any) => {
//     return {
//       ...state,
//       error: error
//     };
//   }),
//
//   on(newPasswordRequest, (state: any,) => {
//     return {
//       ...state,
//       error: null
//     }
//   }),
//   on(newPasswordSuccess, (state: any, {newPasswordResponse}: any) => {
//     localStorage.removeItem("email");
//     return {
//       ...state,
//       error: null,
//     };
//   }),
//   on(newPasswordFailure, (state: any, {error}: any) => {
//     return {
//       ...state,
//       error: error
//     };
//   }),
// );
//
// export function authReducer(state: State | undefined, action: Action) {
//   return _authReducer(state, action);
// }
//
// export const selectAuthState = createFeatureSelector<State>('auth');
//
// export const selectToken = createSelector(
//   selectAuthState,
//   (state) => state.token
// );
// export const selectUser = createSelector(
//   selectAuthState,
//   (state) => state.user
// );
// export const selectSignUpError = createSelector(
//   selectAuthState,
//   (state) => state.error
// );
//
// export const selectLoginError = createSelector(
//   selectAuthState,
//   (state) => state.error
// );
// export const selectUserEmail = createSelector(
//   selectAuthState,
//   (state) => state
// );
// export const selectPasswordResetError = createSelector(
//   selectAuthState,
//   (state) => state.error
// );
//
// export const selectPasswordCodeValidationError = createSelector(
//   selectAuthState,
//   (state) => state.error
// );
