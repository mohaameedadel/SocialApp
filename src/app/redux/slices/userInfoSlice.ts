import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

interface IUser {
  name: string;
  photo: string;
  dateOfBirth: string;
  email: string;
  _id:string
}

export const getUserData = createAsyncThunk(
  "userInfo/getUserData",
  async () => {
    try {
      const { data } = await axios.get(
        "https://linked-posts.routemisr.com/users/profile-data",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      return data.user;
    } catch (error) {
      return error;
    }
  }
);

export const updateUserImage = createAsyncThunk(
  "userInfo/updateUserImage",
  async (formData: FormData) => {
    try {
      const { data } = await axios.put(
        "https://linked-posts.routemisr.com/users/upload-photo",
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message, { className: "z-[99999999]" });
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const changeUserPass = createAsyncThunk(
  "userInfo/changeUserPass",
  async (values: { password: string; newPassword: string }) => {
    try {
      const { data } = await axios.patch(
        "https://linked-posts.routemisr.com/users/change-password",
        values,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      localStorage.setItem("token", data.token);
      toast.success(data.message);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.error);
      return error.response.data.error;
    }
  }
);

interface IinitialState {
  loading: boolean;
  addImage: boolean;
  photo: string;
  name: string;
  dateOfBirth: string;
  email: string;
  id:string
}

const initialState: IinitialState = {
  loading: false,
  addImage: false,
  photo: "",
  name: "",
  dateOfBirth: "",
  email: "",
  id:""
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getUserData.fulfilled,
      (state, action: { payload: IUser }) => {
        state.loading = false;
        state.photo = action.payload.photo;
        state.name = action.payload.name;
        state.dateOfBirth = action.payload.dateOfBirth;
        state.email = action.payload.email;
        state.id = action.payload._id
      }
    );
    builder.addCase(updateUserImage.pending, (state) => {
      state.loading = true;
      state.addImage = false;
    });
    builder.addCase(updateUserImage.fulfilled, (state) => {
      state.loading = false;
      state.addImage = true;
    });
    builder.addCase(changeUserPass.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changeUserPass.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export const userInfo = userInfoSlice.reducer;
