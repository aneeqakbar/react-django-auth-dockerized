import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState, IUser, LoginPayload } from "interfaces/auth.interfaces";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "constants/auth.constants";
import { RootState } from "app/store";
// import { isNull } from "util";

export const initialState: IAuthState = {
    authenticated: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state: IAuthState, action: PayloadAction<LoginPayload>) => {
            state.user = { ...action.payload.user };
            state.authenticated = true;

            if (action.payload.access) {
                localStorage.setItem(ACCESS_TOKEN, action.payload.access);
                localStorage.setItem(REFRESH_TOKEN, action.payload?.refresh || "");
            }
        },
        logout: (state: IAuthState) => {
            delete state.user;
            state.authenticated = false;

            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
        },
        updateUser: (state: IAuthState, action: PayloadAction<IUser>) => {
            state.user = {
                ...state.user,
                ...action.payload,
            };

            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
        },
    },
});

// Action creators are generated for each case reducer function
export const { login, logout, updateUser } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
