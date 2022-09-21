import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL } from "constants/api.constants";
import { ACCESS_TOKEN } from "constants/auth.constants";
import {
    ILoginApiData,
    ILoginApiResponse,
    IRegisterApiData,
    IRegisterApiResponse,
    IUser
} from "interfaces/auth.interfaces";

axios.defaults.baseURL = BASE_URL;

export const getAuthenticatedUser = async (): Promise<AxiosResponse<IUser, any>> => {
    const config: AxiosRequestConfig<any> = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
    };
    return await axios.get<any, AxiosResponse<IUser, any>>("auth/me/", config);
};

export const loginUser = async (
    data: ILoginApiData
): Promise<AxiosResponse<ILoginApiResponse, any>> => {
    return await axios.post<any, AxiosResponse<ILoginApiResponse, any>>(
        "auth/login/",
        data
    );
};

export const registerUser = async (
    data: IRegisterApiData
): Promise<AxiosResponse<IRegisterApiResponse, any>> => {
    return await axios.post<any, AxiosResponse<IRegisterApiResponse, any>>(
        "auth/register/",
        data
    );
};

export const refreshToken = () => {};
