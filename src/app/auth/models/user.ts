export interface User {
    id?: string;
    email: string ;
    password: string;
    token?: string;
}

export interface errors {
    code: number;
    message: string;
}
export interface LoginResponse {
    user?: User;
    token: string;
    refreshToken: string;
    errors?: errors;
}

export interface signUpUser {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    repeatPassword: string;
    role: string;
}
export interface SignUpResponse {
    user?: User;
    token: string;
    refreshToken: string;
    errors?: errors;
}

export interface passwordResetResponse {   
    success: boolean;
    errors?: errors;
}

export interface codeValidationResponse {
    success: boolean;
    errors?: errors;
}
export interface newPasswordResponse {
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



