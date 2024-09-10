import { IPost } from "@/app/interfaces/postInterFace";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

interface IPostsState {
  loading: boolean;
  posts: IPost[];
}

const initialState: IPostsState = {
  loading: false,
  posts: [],
};

export const getUserPosts = createAsyncThunk(
  "userPosts/getUserPosts",
  async () => {
    try {
      const { data } = await axios.get(
        "https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      return data.posts;
    } catch (error) {
      return error
    }
  }
);
export const AddUserPost = createAsyncThunk(
  "userPosts/AddUserPost",
  async (formData: FormData) => {
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/posts",
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message, { className: "z-[9999]" });
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }
);

const userPostsSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(AddUserPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(AddUserPost.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(AddUserPost.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getUserPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
  },
});

export const userPosts = userPostsSlice.reducer;
