import axios from "axios";
import { IBlogProps, IErrorResponse } from "../../../types/blogType";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBlogData = createAsyncThunk<
  any,
  string | null,
  { rejectValue: IErrorResponse }
>("blogs/getBlogs", async (token, { rejectWithValue }) => {
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

interface IBlogState {
  data: IBlogProps[];
  loading: boolean;
  error: IErrorResponse | null;
}
const initialState: IBlogState = {
  data: [],
  loading: false,
  error: null,
};
const blogSlice = createSlice({
  name: "blog/getBlogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogData.fulfilled, (state, action: PayloadAction<any>) => {
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
