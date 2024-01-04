import axios from "axios";
import { IBlogProps, IErrorResponse } from "../../../types/blogType";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getBlogs = createAsyncThunk<
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

interface InitialStateProps {
  data: IBlogProps[];
  loading: boolean;
  error: IErrorResponse | null;
}
const initialState: InitialStateProps = {
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
      .addCase(getBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogs.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      });
  },
});

export const {} = blogSlice.actions;
export default blogSlice.reducer;
