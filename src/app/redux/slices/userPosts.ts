import { IPost } from "@/app/interfaces/postInterFace";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

interface IPostsState {
  loading: boolean;
  posts: IPost[];
  addPost: boolean;
  removePost: boolean;
  updatePost: boolean;
}

const initialState: IPostsState = {
  loading: false,
  posts: [],
  addPost: false,
  removePost: false,
  updatePost: false,
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
      return error;
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

export const deletePost = createAsyncThunk(
  "userPosts/deletePost",
  async (id: string) => {
    try {
      const { data } = await axios.delete(
        `https://linked-posts.routemisr.com/posts/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success("Post Removed");
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const updatePost = createAsyncThunk(
  "userPosts/updatePost",
  async ({ formData, id }: { formData: FormData; id: string }) => {
    try {
      const { data } = await axios.put(
        `https://linked-posts.routemisr.com/posts/${id}`,
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
      state.addPost = false;
    });
    builder.addCase(AddUserPost.fulfilled, (state) => {
      state.loading = false;
      state.addPost = true;
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
    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
      state.removePost = false;
    });
    builder.addCase(deletePost.fulfilled, (state) => {
      state.loading = false;
      state.removePost = true;
    });
    builder.addCase(deletePost.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updatePost.pending, (state) => {
      state.loading = true;
      state.updatePost = false;
    });
    builder.addCase(updatePost.fulfilled, (state) => {
      state.loading = false;
      state.updatePost = true;
    });
    builder.addCase(updatePost.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const userPosts = userPostsSlice.reducer;
