import { createSlice } from "@reduxjs/toolkit";

import { authAPI } from "./authAPI";
import { RootState } from "..";
import { storeTokenInLocalStorage } from "../../utils/localStorage";
import axios from "axios";

export interface UserState {
  email: string;
  name: string;
}

// interface for store state
export interface AuthState {
  user: UserState | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: null | string;
}

// initial state
const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

export const login =
  ({ email, password }: { email: string; password: string }) =>
  async (dispatch: any) => {
    try {
      const response = await authAPI.loginWithPassword(email, password);
      if (response.data?.token) {
        await storeTokenInLocalStorage(response.data?.token as string);
      }
      dispatch(setUser(response.data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setUserError(error?.response?.data));
      }
      console.error(error);
    }
  };

export const signUp =
  ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) =>
  async (dispatch: any) => {
    try {
      const response = await authAPI.signup(name, email, password);
      if (response.data?.token) {
        await storeTokenInLocalStorage(response.data?.token as string);
      }
      dispatch(setUser(response.data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(setUserError(error?.response?.data));
      }
      console.error(error);
    }
  };

export const logout = () => async (dispatch: any) => {
  try {
    await authAPI.logout();
    dispatch(resetUser());
  } catch (error) {
    console.error(error);
  }
};

// authSlice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUser: (state, action) => {
      const { payload } = action;

      state.user = {
        ...payload,
      };
      if (payload?.success) {
        state.isLoggedIn = true;
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.isLoggedIn = false;
        state.isAuthenticated = false;
        state.error = payload?.message;
      }
      state.isLoading = false;
    },
    setUserError: (state, action) => {
      const { payload } = action;
      state.isLoggedIn = false;
      state.isAuthenticated = false;
      state.error = payload?.message;
    },
    resetUser: (state) => {
      state.isLoggedIn = false;
      state.isAuthenticated = false;
      state.error = null;
      state.user = null;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    setAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
  },
});

export const {
  setUser,
  setUserError,
  resetUser,
  setLoading,
  setAuthenticated,
} = authSlice.actions;

export const isLoggedInFromStore = (state: RootState) => state.auth.isLoggedIn;

export const userDetailsFromStore = (state: RootState) => state.auth.user;

export const loginErrorFromStore = (state: RootState) => state.auth.error;

export default authSlice.reducer;
