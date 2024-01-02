import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IErrorResponse } from "../../../types/blogType";

export const fetchBlogData = createAsyncThunk<
  any,
  string | null,
  { rejectValue: IErrorResponse }
>("blogs", async (token, { rejectWithValue }) => {
  try {
    const res = await axios.get(
      "https://api.blog.redberryinternship.ge/api/blogs",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBlogData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      });
  },
});

export const {} = blogSlice.actions;
export default blogSlice.reducer;
