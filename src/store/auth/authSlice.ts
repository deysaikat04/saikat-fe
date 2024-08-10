import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { authAPI } from "./authAPI";
import { RootState } from "..";
import { storeTokenInLocalStorage } from "../../utils/localStorage";

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
  loginError: null | string;
}

// initial state
const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  isAuthenticated: false,
  loginError: null,
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
      console.error(error);
    }
  };

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    {
      username,
      email,
      password,
    }: { username: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await authAPI.signup(username, email, password);
      return response;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

// export const login = createAsyncThunk(
//   "auth/login",
//   async (
//     { email, password }: { email: string; password: string },
//     thunkAPI
//   ) => {
//     try {
//       const user = await authAPI.loginWithPassword(email, password);
//       return user;
//     } catch (error: any) {
//       console.error(error);
//       return thunkAPI.rejectWithValue({ error: error.code });
//     }
//   }
// );

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await authAPI.logout();
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue({ error });
  }
});

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
        state.loginError = null;
      } else {
        state.isLoggedIn = false;
        state.isAuthenticated = false;
        state.loginError = payload?.message;
      }
      state.isLoading = false;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    setAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
  },
});

// export actions from slice if any reducers created
export const { setUser, setLoading, setAuthenticated } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const isLoggedInFromStore = (state: RootState) => state.auth.isLoggedIn;

export const userDetailsFromStore = (state: RootState) => state.auth.user;

export const loginErrorFromStore = (state: RootState) => state.auth.loginError;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
/** export const loginThunk = (): AppThunk => (dispatch, getState) => {
  const isLogged = isLoggedInFromStore(getState());
  if (isLogged) {
    // dispatch action here
  }
}; */

export default authSlice.reducer;
