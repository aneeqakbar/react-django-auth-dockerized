export interface IUser {
    id: number;
    username: string;
    email?: string;
}

export interface IAuthState {
    user?: IUser;
    authenticated: boolean;
}

export interface LoginPayload {
    user: IUser;
    access?: string;
    refresh?: string;
}

export interface ILoginApiData {
    username: string;
    password: string;
}

export interface ILoginApiResponse {
    user: IUser;
    access: string;
    refresh: string;
}

export interface IRegisterApiData {
    username: string;
    email: string;
    password1: string;
    password2: string;
}

export interface IRegisterApiResponse {
    user: IUser;
    access: string;
    refresh: string;
}
