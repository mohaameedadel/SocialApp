import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import toast from "react-hot-toast";

export interface ISignupData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: string;
  gender: string;
}

export const signUp = createAsyncThunk(
  "signupSlice/signUp",
  async (userData: ISignupData) => {
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        userData
      );
      toast.success(data.message);
      return data.message;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.error);
      return error.response.data.error;
    }
  }
);

interface IState {
  loading: boolean;
  message: string;
}

const initialState: IState = {
  loading: false,
  message: "",
};

export const signup = createSlice({
  name: "signupSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload
    });
  },
});

export const signupSlice = signup.reducer;
