import { IPost } from "@/app/interfaces/postInterFace";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IPostsState {
  loading: boolean;
  posts: IPost[];
  post:IPost|null
}

const initialState: IPostsState = {
  loading: false,
  posts: [],
  post:null
};

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  try {
    if (localStorage.getItem("token")) {
      const { data } = await axios.get(
        "https://linked-posts.routemisr.com/posts?limit=50",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      return data.posts;
    }
  } catch (error) {
    return error
  }
});

export const getSinglePost = createAsyncThunk("posts/getSinglePost", async (id:string) => {
  try {
    if (localStorage.getItem("token")) {
      const { data } = await axios.get(
        `https://linked-posts.routemisr.com/posts/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );


      return data.post;
    }
  } catch (error) {
    return error
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
    builder.addCase(getSinglePost.pending, (state)=>{
      state.loading = true
    })
    builder.addCase(getSinglePost.fulfilled, (state,action)=>{
      state.loading = false
      state.post = action.payload
    })
  },
});

export const posts = postsSlice.reducer;
