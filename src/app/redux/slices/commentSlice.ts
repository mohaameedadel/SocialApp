import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

interface IPostsState {
  loading: boolean;
  commentAdd: boolean;
  commentDeleted: boolean;
}

const initialState: IPostsState = {
  loading: false,
  commentAdd: false,
  commentDeleted: false,
};

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({
    content,
    id,
  }: {
    content: { content: string };
    id: { post: string };
  }) => {
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/comments",
        { ...content, ...id },
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
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (id: string) => {
    try {
      const { data } = await axios.delete(
        `https://linked-posts.routemisr.com/comments/${id}`,
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

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addComment.pending, (state) => {
      state.loading = true;
      state.commentAdd = false;
    });
    builder.addCase(addComment.fulfilled, (state) => {
      state.loading = false;
      state.commentAdd = true;
    });
    builder.addCase(addComment.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteComment.pending, (state) => {
      state.loading = true;
      state.commentDeleted = false;
    });
    builder.addCase(deleteComment.fulfilled, (state) => {
      state.loading = false;
      state.commentDeleted = true;
    });
    builder.addCase(deleteComment.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const comments = commentSlice.reducer;
