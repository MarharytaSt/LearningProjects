export type ApiFieldError = {
    path: string;
    message: string;
}

export type ApiErrorResponse = {
    message: string;
    errorrs?: ApiFieldError;

}

export type UserPublic = {
    id: string;
    email: string;
    name: string;
}

export type UserProfile = UserPublic & {
    createdAt: string;
    updatedAt: string;
}


export type AuthLoginRequest = {
    email: string;
    password: string;
    name: string;
}

export type AuthResponse = {
    token: string;
    user: UserPublic;
}

export type AuthRegisterRequest = {
    email: string;
    password: string;
}

