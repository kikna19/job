export interface IUserState {
  isLoaded: boolean;
  isLoading: boolean;
  user: UserState | null;
  error: any;
}

export interface UserState {
  id?: string;
  email: string;
  password: string;
  token?: string;
}

export interface errors {
  code: number;
  message: string;
}

export interface LoginResponse {
  user?: UserState;
  token: string;
  refreshToken: string;
  errors?: errors;
}

export interface signUpUser {
  firstName: string;
  lastName: string;
  password: string;
  repeatPassword: string;
  email: string;
  phoneNumber: string;
  cv?: string;
}

export interface SignUpResponse {
  user?: UserState;
  token: string;
  refreshToken: string;
  errors?: errors;
}

export interface ExternalLogin{
  providerType: string;
  token: string;
}
export interface PasswordResetActionRequest{
  email: string
}

export interface PasswordResetResponse {
  success: boolean;
  errors?: errors;
}

export interface CodeValidationResponse {
  success: boolean;
  errors?: errors;
}

export interface CodeValidationRequest {
  email: string;
  code: errors;
}

export interface NewPasswordResponse {
  success: boolean;
  errors?: errors;
}

export interface AppUser {
  firstname: string;
  lastname: string;
  email: string;
}


export interface RefreshToken {
  userId: string;
  tokenString: string;
  expireAt: Date;
}

export interface Tokens {
  jwt: string;
  refreshToken: string;
}



