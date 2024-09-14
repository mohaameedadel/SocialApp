
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import toast from "react-hot-toast";

interface IUserData {
  email: string;
  password: string;
}

export const signIn = createAsyncThunk(
  "loginSlice/SignIn",
  async (userData: IUserData) => {
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        userData
      );
      toast.success(data.message);
      return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      toast.error(error.response.data.error);
      return error.response.data.error;
    }
  }
);


interface IinitialState {
  token: string | null;
  loading: boolean;
}

const initialState: IinitialState = {
  token: "",
  loading: false,
};

export const login = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    clearData: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    getToken: (state) => {
      if (localStorage.getItem("token")) {
        state.token = localStorage.getItem("token");
      } else {
        state.token = null;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.message === "success") {
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      }
    });
  },
});
export const { clearData, getToken } = login.actions;
export const loginSlice = login.reducer;


