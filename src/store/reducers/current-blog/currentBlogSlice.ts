import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IBlogProps, IErrorResponse } from "../../../types/blogType";

export const getCurrentBlog = createAsyncThunk<
  IBlogProps,
  { blogId: string; token: string },
  { rejectValue: IErrorResponse }
>("blogs/currentBlog", async ({ blogId, token }, { rejectWithValue }) => {
  try {
    const res = await axios.get(
      `https://api.blog.redberryinternship.ge/api/blogs/${blogId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return rejectWithValue(error.response.data.message as IErrorResponse);
      } else {
        return rejectWithValue({ message: "An error occurred", errors: {} });
      }
    } else {
      throw error;
    }
  }
});

interface initialStateProps {
  currentBlog: IBlogProps;
  loading: boolean;
  error: IErrorResponse | null;
}

const initialState: initialStateProps = {
  currentBlog: {
    id: null,
    title: "",
    description: "",
    image: "",
    publish_date: "",
    categories: [],
    author: "",
    email: "",
  },
  loading: false,
  error: null,
};
const currentBlogSlice = createSlice({
  name: "blogs/currentBlog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
      })
      .addCase(getCurrentBlog.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: "An error occurred", errors: {} };
        }
      });
  },
});

export const {} = currentBlogSlice.actions;
export default currentBlogSlice.reducer;
