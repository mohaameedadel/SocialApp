
import { IPost } from "@/app/interfaces/postInterFace";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IPostsState {
  loading: boolean;
  posts: IPost[];
}

const initialState: IPostsState = {
  loading: false,
  posts: [],
};



export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  try {
    if (localStorage.getItem("token")) {
      const { data } = await axios.get(
        "https://linked-posts.routemisr.com/posts?limit=50",
        { headers:{
          token:localStorage.getItem("token")
        } }
      );

      return data.posts;
    }
  } catch (error) {
    console.log(error);
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
  },
});

export const posts = postsSlice.reducer;
